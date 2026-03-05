import { createContext, useContext, useState, useEffect } from "react";
import Context from "./Context";

const TimerContext = createContext();

export function TimerProvider({ children }) {
    const [duration, setDuration] = useState(90);
    const [remainingSeconds, setRemainingSeconds] = useState(180);
    const [isRunning, setIsRunning] = useState(false);

    const {setIsTimed}= useContext(Context);

    useEffect(() => {
        let intervalId;
        if (isRunning && remainingSeconds > 0) {
            intervalId = setInterval(() => {
                setRemainingSeconds((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalId);
                        setIsRunning(false);
                        setIsTimed(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, remainingSeconds]);

    const startTimer = (newDurationInSeconds) => {
        if (newDurationInSeconds) {
            setDuration(newDurationInSeconds);
            setRemainingSeconds(newDurationInSeconds);
        }
        setIsRunning(true);
    };

    const pauseTimer = () => setIsRunning(false);
    
    const resetTimer = () => {
        setIsRunning(false);
        setRemainingSeconds(duration);
    };

    const isAboutToEnd = remainingSeconds > 0 && remainingSeconds <= 10;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const remainingTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
        <TimerContext.Provider value={{ 
            remainingTime, isAboutToEnd, remainingSeconds, 
            startTimer, pauseTimer, resetTimer, isRunning, duration
        }}>
            {children}
        </TimerContext.Provider>
    );
}

export function useGlobalTimer() {
    return useContext(TimerContext);
}