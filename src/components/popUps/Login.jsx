import React, { useContext, useEffect, useState } from 'react'
import LoginContext from '../../context/LoginContext'
import Context from '../../context/Context';
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { app } from '../../lib/firebaseClient'
import { doc, getDoc, getFirestore } from "firebase/firestore";
import ShowLoginError from '../ShowLoginError';
import { setDataLocal } from '../../lib/localStorage';
import { RiCloseFill } from 'react-icons/ri';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRememberMe, setIsRememberMe] = useState(true);
    const [authError, setAuthError] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = getAuth(app);
    const db = getFirestore(app);

    const { setIsLoggedIn, setUserHistory } = useContext(LoginContext);
    const { setShowPopUp } = useContext(Context);

    async function handleLogin() {
        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (!user.emailVerified) {
                alert("Please verify your email first!");
                return;
            }
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);
            const userHistoryRef = doc(db, "users", user.uid, "stats", "history");
            const userHistorySnap = await getDoc(userHistoryRef);
            if (userDocSnap.exists() && userHistorySnap.exists()) {
                const userData = userDocSnap.data();
                console.log("Retrieved User Data:", userData);
                const userHistory = userHistorySnap.data();
                console.log("retrived User History:", userHistory)
                setUserHistory(userHistory);
                setDataLocal("userData", userData);
                setDataLocal("userId", user.uid);
                setDataLocal("isNotFirstTimeVisit", true);
                setShowPopUp(null);
            } else {
                console.log("No such document in Firestore!");
            }
            setLoading(false);
            setIsLoggedIn(true);
            setDataLocal("isLoggedIn", true);
        } catch (error) {
            setLoading(false)
            setAuthError(error.code);
            setTimeout(() => {
                setAuthError('');
            }, 7000);
        }
    }

    return (
        <div className={`absolute top-0 left-0 z-30 h-screen w-screen bg-[#62626225] backdrop-blur-xs`}>
            <div className={`flex flex-col items-center pop-up w-8/10 h-5/10 -translate-y-10 md:translate-y-0 md:h-7/10 md:w-23/100`}>
                <div className="w-full flex justify-between h-fit text-2xl items-center">
                    <button onClick={() => { setShowPopUp(null) }} className='cursor-pointer ml-auto bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] h-full bg-[#d7ead5] border border-b-0 rounded-b-none rounded-xl px-2 p-1 flex items-center border-[#0000004d]'>
                        <RiCloseFill className='text-[#234120]' />
                    </button>
                </div>
                <div className='overflow-hidden shadow-[0_4px_0_0_#234120] flex flex-col h-full w-full items-center border border-[#0000004d] bg-[#d7ead5] rounded-tr-none  rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] bg-size-[30px_30px]'>
                    <div className='w-full h-3/10 p-2 md:p-3 flex flex-col gap-1 md:gap-2 items-center justify-start'>
                        <div className='flex flex-row pt-3 md:pt-3 md:flex-col gap-2 h-fit w-full justify-center items-center'>
                            <img src="/logo.svg" className='size-[calc(2rem+0.4vw)]' />
                            <div className='h-fit'>
                                <p className='text-3xl md:text-4xl'>Login</p>
                            </div>
                        </div>
                        {authError ? <ShowLoginError authError={authError} /> :
                            <p className='text-balance text-center'>Login to unlock full experience of W-GUESSER</p>
                        }
                    </div>
                    <div className='w-full h-7/10 p-3 pt-1 md:pt-5 flex flex-col items-center gap-5'>
                        <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} id="email" placeholder='Enter your username...' className='p-2 text-xl text-[#234120] focus:outline-0 bg-[#acdda8] border-b-2 w-95/100' />
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} id="pass" placeholder='Enter your password...' className='p-2 text-xl text-[#234120] focus:outline-0 bg-[#acdda8] border-b-2 w-95/100' />
                        <input className='hidden peer' value={isRememberMe} onChange={(e) => { setIsRememberMe(prev => !prev) }} type="checkbox" name="remember" id="remember" />
                        <label className='flex items-center gap-2 w-95/100 text-[#234120] cursor-pointer' htmlFor="remember">{isRememberMe ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}Remember Me</label>
                        <button disabled={loading} onClick={handleLogin} className='p-2 mt-2 shadow-[2px_3px_0_0_#acdda8] cursor-pointer bg-[#234120] text-2xl text-[#acdda8] w-95/100'>{loading ? 'Please wait...' : 'Login'}</button>
                        <p className='text-[#234120] -mt-2 md:mt-0'>Don't have an account <span onClick={() => { setShowPopUp('SignUp') }} className='bg-[#acdda8] p-0.5 shadow-[1px_2px_0_0_#234120] cursor-pointer'>Register</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login