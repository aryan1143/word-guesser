import React, { useState } from 'react'
import LoginContext from './LoginContext'

const LoginContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,

    }

  return (
    <LoginContext.Provider value={value}>
        {children}
    </LoginContext.Provider>
  )
}

export default LoginContextProvider