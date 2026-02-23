import { useState } from "react";
import Context from "./Context";


const ContextProvider = ({ children }) => {
    const [showPopUp, setShowPopUp] = useState(null);
    const [soundOn, setSoundOn] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessege, setToastMessege] = useState('');

    function showToastMessege (text) {
        setShowToast(true);
        setToastMessege(text);
        setTimeout(() => {
            setShowToast(false);
            setToastMessege('');
        }, 5000);
    }

    const value = {
        showPopUp,
        setShowPopUp,
        soundOn,
        setSoundOn,
        showToast,
        toastMessege,
        showToastMessege
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;