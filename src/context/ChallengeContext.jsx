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

    const { setChallengeId, setShowPopUp, setShowCreateChallenge, setIsTimed, isTimed, challengeId, setIsChallengePopUp, setAllWords, setAllWordsState, setLetterIndex, setSubmitedRowNo } = useContext(Context);
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
                challengeState.exitChallenge(challengeId, true);
                setIsTimed(false);
            }
        }
    }, [remainingSeconds, challengeData])


    return (
        <ChallengeContext.Provider value={challengeState}>
            {children}
        </ChallengeContext.Provider>
    );
};

export default ChallengeContext;