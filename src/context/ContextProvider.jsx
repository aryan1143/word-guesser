import { useState } from "react";
import Context from "./Context";


const ContextProvider = ({ children }) => {
    const [showPopUp, setShowPopUp] = useState(null);
    const [soundOn, setSoundOn] = useState(false);
    console.log(showPopUp)

    const value = {
        showPopUp,
        setShowPopUp,
        soundOn,
        setSoundOn
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;