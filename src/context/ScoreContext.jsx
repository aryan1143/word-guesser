import { createContext, useContext, useState } from "react";

const ScoreContext = createContext();

export const ScoreContextProvider = ({ children }) => {
    const [currentScore, setCurrentScore] = useState(0);
    const [currentWordScore, setCurrentWordScore] = useState(0);

    function getWordScore(wordState) {
        if (!wordState) return;
        const counts = {};
        for (const char of wordState) {
            counts[char] = (counts[char] || 0) + 1;
        }
        return ((counts?.R * 2) + counts?.F);
    }

    return (
        <ScoreContext.Provider value={{
            currentScore, setCurrentScore, getWordScore, currentWordScore, setCurrentWordScore
        }}>
            {children}
        </ScoreContext.Provider>
    )
}

export function useScoreContext() {
    return useContext(ScoreContext);
}