import { useState } from "react";
import Context from "./Context";


const ContextProvider = ({ children }) => {
    const [showPopUp, setShowPopUp] = useState(null);
    const [soundOn, setSoundOn] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessege, setToastMessege] = useState('');
    const [showCreateChallenge, setShowCreateChallenge] = useState(false);
    const [challengeId, setChallengeId] = useState(null);
    const [isTimed, setIsTimed] = useState(false);
    const [inDailyWordle, setInDailyWordle] = useState(false);
    const [isChallengePopUp, setIsChallengePopUp] = useState(false);
    
    const [isHardMode, setIsHardMode] = useState(false);
    const [gameTime, setGameTime] = useState(0);
    const [darkMode, setDarkMode] = useState(false);

    function showToastMessege (text) {
        setShowToast(true);
        setToastMessege(text);
        setTimeout(() => {
            setShowToast(false);
            setToastMessege('');
        }, 2500);
    }

    const value = {
        showPopUp,
        setShowPopUp,
        soundOn,
        setSoundOn,
        showToast,
        toastMessege,
        showToastMessege,
        showCreateChallenge,
        setShowCreateChallenge,
        challengeId,
        setChallengeId,
        isTimed,
        setIsTimed,
        inDailyWordle,
        setInDailyWordle,
        isChallengePopUp,
        setIsChallengePopUp,
        isHardMode,
        setIsHardMode,
        gameTime,
        setGameTime,
        darkMode,
        setDarkMode,
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;