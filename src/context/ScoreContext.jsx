import { createContext, useContext, useEffect, useState } from "react";
import WordsContext from "./WordsContext";

const ScoreContext = createContext();

export const ScoreContextProvider = ({ children }) => {
    const [currentScore, setCurrentScore] = useState(0);

    return (
        <ScoreContext.Provider value={{
            currentScore, setCurrentScore
        }}>
            {children}
        </ScoreContext.Provider>
    )
}

export function useScoreContext() {
    return useContext(ScoreContext);
}