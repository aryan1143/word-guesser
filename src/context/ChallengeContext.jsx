import React, { createContext, useContext, useEffect } from 'react';
import useChallengeWordle from '../hooks/useChallengeWordle';
import WordsContext from './WordsContext';
import Context from './Context';
import { getDataLocal } from '../lib/localStorage';
import { getWordByIndex } from '../components/utils/getWordleOrIndex';
import { useNavigate } from 'react-router-dom';

const ChallengeContext = createContext();

export const ChallengeProvider = ({ children }) => {
    const challengeState = useChallengeWordle(); 
    const { challengeData } = challengeState;

    const { setChallengeId, setShowPopUp, setShowCreateChallenge } = useContext(Context);
    const { setTargetWord } = useContext(WordsContext);

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
                const wordle = getWordByIndex(challengeData.wordle1Index);
                setTargetWord(wordle);
                navigate('/game-page');
                setShowCreateChallenge(false);
                setShowPopUp(null);
            }
        }
    }, [challengeData, setTargetWord]);

    return (
        <ChallengeContext.Provider value={challengeState}>
            {children}
        </ChallengeContext.Provider>
    );
};

export default ChallengeContext;