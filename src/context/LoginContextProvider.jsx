import React, { use, useState } from 'react'
import LoginContext from './LoginContext'

const LoginContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userHistory, setUserHistory] = useState(null);

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        userHistory,
        setUserHistory,
        
    }

  return (
    <LoginContext.Provider value={value}>
        {children}
    </LoginContext.Provider>
  )
}

export default LoginContextProvider