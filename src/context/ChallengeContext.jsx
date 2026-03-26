import React, { createContext, useContext, useEffect } from 'react';
import useChallengeWordle from '../hooks/useChallengeWordle';
import WordsContext from './WordsContext';
import Context from './Context';
import { getDataLocal } from '../lib/localStorage';
import { getWordByIndex } from '../components/utils/getWordleOrIndex';
import { useNavigate } from 'react-router-dom';
import { useGlobalTimer } from './TimerContext';

const ChallengeContext = createContext();

export const ChallengeProvider = ({ children }) => {
    const challengeState = useChallengeWordle();
    const { challengeData } = challengeState;

    const userId = getDataLocal('userId');

    const { setChallengeId, setShowPopUp, setShowCreateChallenge, setIsTimed, isTimed, setIsChallengePopUp, showPopUp } = useContext(Context);
    const { setTargetWord, resetWordleData, randomWord } = useContext(WordsContext);

    const { startTimer, remainingSeconds } = useGlobalTimer();

    const navigate = useNavigate();

    useEffect(() => {
        const ongoingChallengeId = getDataLocal('challengeId');
        if (ongoingChallengeId) {
            setChallengeId(ongoingChallengeId);
        }
    }, [setChallengeId]);

    useEffect(() => {
        if (challengeData && challengeData.status === 'active') {
            if (!challengeData.isTimed) {
                const wordleIndex = challengeData.createdBy === userId ? challengeData.wordle2Index : challengeData.wordle1Index;
                const wordle = getWordByIndex(wordleIndex);
                setTargetWord(wordle);
            } else if (challengeData) {
                setIsTimed(true);
                startTimer(challengeData.duration);
                const wordle = randomWord();
                setTargetWord(wordle);

            }
            resetWordleData();
            navigate('/game-page');
            setShowCreateChallenge(false);
            setShowPopUp(null);
        }
    }, [challengeData, setTargetWord]);

    useEffect(() => {
        if (challengeData && challengeData.status === 'active') {
            if (isTimed && remainingSeconds <= 0) {
                setShowPopUp('won');
                setIsChallengePopUp(true);
                setIsTimed(false);
            }
        }
    }, [remainingSeconds, challengeData, showPopUp])


    useEffect(() => {
        if (!challengeData || challengeData.status !== 'active') return;

        const isHost = challengeData.createdBy === userId;
        const myStatusField = isHost ? "player1Status" : "player2Status";
        const opponentStatusField = isHost ? "player2Status" : "player1Status";

        const myStatus = challengeData[myStatusField];
        const opponentStatus = challengeData[opponentStatusField];

        if (
            (isHost && challengeData.player2 === "left") ||
            (!isHost && challengeData.player1 === "left")
        ) {
            setShowPopUp("won");
            setIsChallengePopUp(true);
            return;
        }

        if (myStatus && !opponentStatus) {
            setShowPopUp("waiting");
            setIsChallengePopUp(true);
        }
    }, [challengeData]);

    useEffect(() => {
        if (!challengeData || challengeData.status !== 'finished') return;

        if (challengeData.winner === "draw") {
            setShowPopUp("draw");
        } else if (challengeData.winner === userId) {
            setShowPopUp("won");
        } else {
            setShowPopUp("lost");
        }

        setIsChallengePopUp(true);
    }, [challengeData?.status, challengeData?.winner]);

    return (
        <ChallengeContext.Provider value={challengeState}>
            {children}
        </ChallengeContext.Provider>
    );
};

export default ChallengeContext;