import React from 'react'

const ShowLoginError = ({authError}) => {
    console.log(authError)

    switch (authError) {
        case "auth/password-does-not-meet-requirements":
            return <p className='text-red-700 text-balance text-center'>Password must contain an uppercase and a digit.</p>
        case "auth/user-not-found":
            return <p className='text-red-700 text-balance text-center'>Wrong email address or password.</p>
        case "auth/invalid-email":
            return <p className='text-red-700 text-balance text-center'>Please enter a valid email.</p>
        case "auth/email-already-in-use":
            return <p className='text-red-700 text-balance text-center'>This email is already in use.</p>
        case "auth/invalid-credential":
            return <p className='text-red-700 text-balance text-center'>Email or password is wrong.</p>
        default:
            return <p className='text-red-700 text-balance text-center'>Try again later.</p>
    }

}

export default ShowLoginError;