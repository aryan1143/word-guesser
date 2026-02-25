import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, runTransaction, serverTimestamp, updateDoc } from "firebase/firestore";
import { app } from "../lib/firebaseClient";
import { useEffect, useState } from "react";
import { getDataLocal } from "../lib/localStorage";

export default function usechallengeWordle() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [challengeStatus, setChallengeStatus] = useState(null);
    const [challengeURL, setChallengeURL] = useState(null);
    const [challengeData, setChallengeData] = useState(null);
    const [challengeId, setChallengeId] = useState(null);
    const uid = getDataLocal('userId');
    const db = getFirestore(app);

    async function createChallenge(wordleIndex = 0, isTimed = false, duration = 0) {
        setLoading(true);
        try {
            const baseURL = window.location.origin;

            const ref = await addDoc(collection(db, "challenges"), {
                createdAt: serverTimestamp(),
                createdBy: uid,
                players: [uid],
                isTimed,
                duration,
                wordleIndex,
                status: "waiting",
                player1: "joined",
                player2: "empty",
            });
            setChallengeId(ref.id);
            setChallengeURL(`${baseURL}/challenge/${ref.id}`);
        } catch (e) {
            setError(e.code);
        } finally {
            setLoading(false);
        }
    }

    async function getChallengeInfo(challengeId) {
        setLoading(true);
        try {
            const ref = doc(db, "challenges", challengeId);
            const snap = await getDoc(ref);
            if (!snap.exists()) throw new Error("Challenge-not-found");
            setChallengeId(challengeId);
            const data = snap.data();
            setChallengeData(data);
        } catch (e) {
            setChallengeStatus(e.message);
        } finally {
            setLoading(false);
        }
    }

    async function acceptChallenge(challengeId) {
        setLoading(true);

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
                    players: arrayUnion(uid),
                    player2: "joined",
                    status: "ready",
                });
            });

        } catch (e) {
            setChallengeStatus(e.message);
        } finally {
            setLoading(false);
        }
    }

    async function startChallenge(challengeId) {
        setLoading(true);

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
            setLoading(false);
        }
    }

    async function exitChallenge(challengeId, isFinished = false) {
        setLoading(true);

        try {
            const ref = doc(db, "challenges", challengeId);

            if (isFinished) {
                await deleteDoc(ref);
                return;
            }

            const snap = await getDoc(ref);
            const data = snap.data();

            const isHost = data.createdBy === uid;
            const field = isHost ? "player1" : "player2";

            await updateDoc(ref, {
                [field]: "left",
                status: "abondened",
            });

        } catch (e) {
            setError(e.code);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!challengeId) return;
        const ref = doc(db, "challenges", challengeId);

        const unsubscribe = onSnapshot(ref, snap => {
            
            if (!snap.exists()) return;

            const data = snap.data();
            setChallengeData(data);

            if (data.player2 === "joined" && data.status === "ready") {
                setChallengeStatus("opponent-joined");
            }

            if (data.status === "active") {
                setChallengeStatus("game-started");
            }

            if (data.player1 === "left" || data.player2 === "left") {
                setChallengeStatus("player-left");
            }
        })

        return () => unsubscribe();
    }, [challengeId])


    return {
        loading,
        error,
        challengeURL,
        challengeStatus,
        challengeData,
        createChallenge,
        acceptChallenge,
        startChallenge,
        exitChallenge,
        getChallengeInfo
    };
}
