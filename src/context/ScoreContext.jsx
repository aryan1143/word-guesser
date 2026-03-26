import { createContext, useContext, useState } from "react";
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