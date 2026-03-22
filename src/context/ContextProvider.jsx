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
    
    const [gameTime, setGameTime] = useState(0);
    
    const [hardMode, setHardMode] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [easyMode, setEasyMode] = useState(false);

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
        hardMode,
        setHardMode,
        gameTime,
        setGameTime,
        darkMode,
        setDarkMode,
        easyMode,
        setEasyMode
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;