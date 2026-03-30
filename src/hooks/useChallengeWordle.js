import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, runTransaction, serverTimestamp, updateDoc } from "firebase/firestore";
import { app } from "../lib/firebaseClient";
import { useContext, useEffect, useRef, useState } from "react";
import { getDataLocal, removeDataLocal, setDataLocal } from "../lib/localStorage";
import Context from "../context/Context";
import { useScoreContext } from "../context/ScoreContext";
import LoginContext from "../context/LoginContext";

export default function useChallengeWordle() {
    const [createChallengeLoading, setCreateChallengeLoading] = useState(false);
    const [acceptChallengeLoading, setAcceptChallengeLoading] = useState(false);
    const [startChallengeLoading, setStartChallengeLoading] = useState(false);
    const [exitChallengeLoading, setExitChallengeLoading] = useState(false);
    const [challengeDataLoading, setChallengeDataLoading] = useState(false);
    const [error, setError] = useState(null);
    const [challengeStatus, setChallengeStatus] = useState(null);
    const [challengeURL, setChallengeURL] = useState(null);
    const [challengeData, setChallengeData] = useState(null);
    const uid = getDataLocal('userId');
    const db = getFirestore(app);
    const userData = getDataLocal('userData');
    const { isLoggedIn } = useContext(LoginContext);

    const statusRef = useRef(null);

    const { showToastMessege, challengeId, setChallengeId } = useContext(Context);
    const { currentScore } = useScoreContext();

    useEffect(() => {
      !challengeId && setChallengeURL(null)
    }, [challengeId])
    

    async function createChallenge({ wordle1Index = 0, wordle2Index = 0, isTimed = false, duration = 0 }) {
        if (!isLoggedIn) {
            setCreateChallengeLoading(false);
            return;
        }
        setCreateChallengeLoading(true);
        try {
            const baseURL = window.location.origin;

            const ref = await addDoc(collection(db, "challenges"), {
                createdAt: serverTimestamp(),
                createdBy: uid,
                players: [uid],
                isTimed,
                duration,
                wordle1Index,
                wordle2Index,
                status: "waiting",
                player1: "joined",
                player2: "empty",
                player1Name: userData.name,
                player2Name: 'empty',
                player1Score: 0,
                player2Score: 0,
                player1Status: null,
                player2Status: null
            });
            setChallengeId(ref.id);
            setChallengeURL(`${baseURL}/challenge/${ref.id}`);
            showToastMessege("Challenge Created Succesfully ✅")
            setDataLocal('challengeId', ref.id);
        } catch (e) {
            setChallengeStatus(e.message);
        } finally {
            setCreateChallengeLoading(false);
        }
    }

    async function acceptChallenge(challengeId, wordle2Index) {
        if (!isLoggedIn) {
            setAcceptChallengeLoading(false);
            return;
        }
        setAcceptChallengeLoading(true);

        try {
            const ref = doc(db, "challenges", challengeId);

            await runTransaction(db, async (transaction) => {
                const snap = await transaction.get(ref);
                if (!snap.exists()) throw new Error("Challenge-not-found");
                const data = snap.data();

                if (data.players.length >= 2) {
                    throw new Error("max-players");
                }

                if (data.player1 !== "joined") {
                    throw new Error("host-left");
                }

                if (data.players.includes(uid)) {
                    throw new Error("already-joined");
                }

                transaction.update(ref, {
                    ...(wordle2Index && { wordle2Index: wordle2Index }),
                    players: arrayUnion(uid),
                    player2: "joined",
                    status: "ready",
                    player2Name: userData.name
                });
            });

            setDataLocal('challengeId', challengeId);
        } catch (e) {
            setChallengeStatus(e.message);
        } finally {
            setAcceptChallengeLoading(false);
        }
    }

    async function startChallenge(challengeId) {
        if (!isLoggedIn) {
            setStartChallengeLoading(false);
            return;
        }
        setStartChallengeLoading(true);

        try {
            const ref = doc(db, "challenges", challengeId);
            const snap = await getDoc(ref);
            const data = snap.data();

            if (data.player1 !== "joined" || data.player2 !== "joined") {
                setChallengeStatus("player-left");
                return;
            }

            await updateDoc(ref, {
                status: "active",
            });
        } catch (e) {
            setError(e.code);
        } finally {
            setStartChallengeLoading(false);
        }
    }

    async function submitResult(challengeId, result) {
        if (!isLoggedIn) return;
        try {
            const ref = doc(db, "challenges", challengeId);

            await runTransaction(db, async (transaction) => {
                const snap = await transaction.get(ref);
                if (!snap.exists()) return;

                const data = snap.data();
                const isHost = data.createdBy === uid;
                const myStatusField = isHost ? "player1Status" : "player2Status";
                const myScoreField = isHost ? "player1Score" : "player2Score";
                const opponentStatusField = isHost ? "player2Status" : "player1Status";
                const opponentScoreField = isHost ? "player2Score" : "player1Score";

                const opponentStatus = data[opponentStatusField];
                const opponentScore = data[opponentScoreField];

                const updates = {
                    [myStatusField]: result,
                    [myScoreField]: currentScore,
                };

                const bothDone = opponentStatus === "won" || opponentStatus === "lost";
                if (bothDone) {
                    const myScore = currentScore;
                    let winner;
                    if (myScore > opponentScore) {
                        winner = uid;
                    } else if (opponentScore > myScore) {
                        winner = isHost ? data.players.find(p => p !== uid) : data.createdBy;
                    } else {
                        winner = "draw";
                    }
                    updates.status = "finished";
                    updates.winner = winner;
                }

                transaction.update(ref, updates);
            });
        } catch (e) {
            console.error("submitResult error:", e);
        }
    }

    async function exitChallenge(challengeId) {
        if (!isLoggedIn) {
            setExitChallengeLoading(false);
            return;
        }
        setExitChallengeLoading(true);

        try {
            const ref = doc(db, "challenges", challengeId);

            await runTransaction(db, async (transaction) => {
                const snap = await transaction.get(ref);
                if (!snap.exists()) return;

                const data = snap.data();
                const isHost = data.createdBy === uid;
                const field = isHost ? "player1" : "player2";

                const updatedData = {
                    [field]: "left",
                    players: arrayRemove(uid),
                    [`${field}Score`]: currentScore
                };

                const remainingPlayers = data.players.length - 1;
                
                if (remainingPlayers <= 0) {
                    console.log(remainingPlayers)
                    transaction.delete(ref);
                } else {
                    transaction.update(ref, updatedData);
                }
            });

            removeDataLocal('challengeId');
            setChallengeId(null);
            setChallengeData(null);
            setChallengeURL(null);

            showToastMessege('Exited challenge');

        } catch (e) {
            console.log(e);
        } finally {
            setExitChallengeLoading(false);
            setChallengeId(null);
        }
    }

    useEffect(() => {
        if (!challengeId) return;
        setChallengeDataLoading(true);
        const ref = doc(db, "challenges", challengeId);

        const unsubscribe = onSnapshot(ref, snap => {

            if (!snap.exists()) {
                removeDataLocal('challengeId');
                setChallengeStatus("not-found");
                return;
            }

            const data = snap.data();
            setChallengeData(data);
            if (data) {
                setChallengeDataLoading(false);
            }

            if (data.status === "ready") {
                showToastMessege("Opponent joined");
            }

            if (data.status === "active" && statusRef.current !== "active") {
                showToastMessege("Game started ✅");
            }

            statusRef.current = data.status;

            if (data.player1 === "left" || data.player2 === "left") {
                if ((data.createdBy === uid && data.player1 === 'left') || (data.createdBy !== uid && data.player2 === 'left')) {
                    showToastMessege('You left 🚨')
                } else if((data.createdBy === uid && data.player2 === 'left') || (data.createdBy !== uid && data.player1 === 'left')){
                    showToastMessege("Player left 🚨");
                }
            }
        })
        return () => unsubscribe();
    }, [challengeId])


    return {
        createChallengeLoading,
        acceptChallengeLoading,
        startChallengeLoading,
        exitChallengeLoading,
        challengeDataLoading,
        error,
        challengeURL,
        challengeStatus,
        challengeData,
        createChallenge,
        acceptChallenge,
        startChallenge,
        submitResult,
        exitChallenge,
        setChallengeId
    };
}
