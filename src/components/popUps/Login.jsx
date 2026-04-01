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
import { IoEye, IoEyeOff } from "react-icons/io5";
import useDialog from '../../hooks/useDialog';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [isRememberMe, setIsRememberMe] = useState(true);
    const [authError, setAuthError] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = getAuth(app);
    const db = getFirestore(app);

    const { setIsLoggedIn, setUserHistory } = useContext(LoginContext);
    const { setShowPopUp, showToastMessege } = useContext(Context);
    const {alertBox} = useDialog();

    async function handleLogin() {
        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (!user.emailVerified) {
                alertBox("Please register again to verify your email first!");
                setLoading(false);
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
                showToastMessege('Login Suceesful ✅')
            } else {
                console.log("No such document in Firestore!");
            }
            setLoading(false);
            setIsLoggedIn(true);
            if (isRememberMe) {
                setDataLocal("isLoggedIn", true);
            }
        } catch (error) {
            setLoading(false)
            setAuthError(error.code);
            setTimeout(() => {
                setAuthError('');
            }, 7000);
        }
    }

    return (
        <div className={`text-[#234120] dark:text-[#e0e8f0] absolute top-0 left-0 z-30 h-screen w-screen bg-[#62626225] dark:bg-[rgba(0,0,0,0.4)] backdrop-blur-xs`}>
            <div className={`flex flex-col items-center pop-up w-8/10 h-fit -translate-y-10 lg:translate-y-0 lg:h-7/10 lg:w-23/100`}>
                <div className="w-full flex justify-between h-fit text-2xl items-center">
                    <button onClick={() => { setShowPopUp(null) }} className='cursor-pointer ml-auto bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] h-full bg-[#d7ead5] dark:bg-[#1d2532] border dark:border-[rgba(255,255,255,0.1)] border-b-0 rounded-b-none rounded-xl px-2 p-1 flex items-center border-[#0000004d]'>
                        <RiCloseFill className='text-[#234120] dark:text-[#e0e8f0]' />
                    </button>
                </div>
                <div className='overflow-hidden shadow-[0_4px_0_0_#234120] dark:shadow-[0_4px_0_0_#000000] flex flex-col h-full w-full items-center border dark:border-[rgba(255,255,255,0.1)] border-[#0000004d] bg-[#d7ead5] dark:bg-[#1d2532] rounded-tr-none  rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[30px_30px]'>
                    <div className='w-full h-3/10 p-2 lg:p-3 flex flex-col gap-1 lg:gap-2 items-center justify-start'>
                        <div className='flex flex-row pt-3 lg:pt-3 lg:flex-col gap-2 h-fit w-full justify-center items-center'>
                            <img src="/logo.svg" className='size-[calc(2rem+0.4vw)]' />
                            <div className='h-fit'>
                                <p className='text-3xl lg:text-4xl'>Login</p>
                            </div>
                        </div>
                        {authError ? <ShowLoginError authError={authError} /> :
                            <p className='text-balance text-center text-[#234120] dark:text-[#b0bcc9]'>Login to unlock full experience of W-GUESSER</p>
                        }
                    </div>
                    <div className='w-full h-7/10 p-3 pt-1 lg:pt-5 flex flex-col items-center gap-5'>
                        <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} id="email" placeholder='Enter your email...' className='p-2 text-xl text-[#234120] dark:text-[#e0e8f0] focus:outline-0 bg-[#acdda8] dark:bg-[#2a3942] border-b-2 dark:border-[#4a7c52] w-95/100' />
                        <div className='relative flex w-95/100 justify-start'>
                            <input type={showPass ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value) }} id="pass" placeholder='Enter your password...' className='p-2 pr-8 text-xl text-[#234120] dark:text-[#e0e8f0] focus:outline-0 bg-[#acdda8] dark:bg-[#2a3942] border-b-2 dark:border-[#4a7c52] w-full' />
                            <button onClick={() => { setShowPass(prev => !prev) }} className='absolute cursor-pointer text-[#234120] dark:text-[#4a7c52] text-xl right-[2%] top-[50%] -translate-y-[50%]'>
                                {showPass ? <IoEyeOff /> : <IoEye />}
                            </button>
                        </div>
                        <input className='hidden peer' value={isRememberMe} onChange={() => { setIsRememberMe(prev => !prev) }} type="checkbox" name="remember" id="remember" />
                        <label className='flex items-center gap-2 w-95/100 text-[#234120] dark:text-[#e0e8f0] cursor-pointer' htmlFor="remember">{isRememberMe ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}Remember Me</label>
                        <button disabled={loading} onClick={handleLogin} className='p-2 mt-2 shadow-[2px_3px_0_0_#acdda8] dark:shadow-[2px_3px_0_0_#4a7c52] cursor-pointer bg-[#234120] dark:bg-[#1a1f24] text-2xl text-[#acdda8] dark:text-[#e0e8f0] w-95/100'>{loading ? 'Please wait...' : 'Login'}</button>
                        <p className='text-[#234120] dark:text-[#b0bcc9] -mt-2 lg:mt-0'>Don't have an account <span onClick={() => { setShowPopUp('SignUp') }} className='bg-[#acdda8] dark:bg-[#4a7c52] p-0.5 px-1 shadow-[1px_2px_0_0_#234120] dark:shadow-[1px_2px_0_0_#000000] dark:text-white cursor-pointer'>Register</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login