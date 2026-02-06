import { useState } from "react";
import Context from "./Context";


const ContextProvider = ({ children }) => {
    // const [showLeaderBoard, setShowLeaderBoard] = useState(false);
    // const [showStatistics, setShowStatistics] = useState(false);
    // const [showSetting, setShowSetting] = useState(false);
    const [showPopUp, setShowPopUp] = useState({ showLeaderBoard: false, showSetting: false, showStatistics: false });

    const value = {
        showPopUp,
        setShowPopUp
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;