import React, { use, useState } from 'react'
import LoginContext from './LoginContext'

const LoginContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [userHistory, setUserHistory] = useState(null);

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
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