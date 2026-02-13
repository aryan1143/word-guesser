import React, { useContext, useState } from 'react'
import LoginContext from '../../context/LoginContext'
import closeIcon from '/close-icon48.png'
import Context from '../../context/Context';
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
const Login = () => {
    const [isRememberMe, setIsRememberMe] = useState(true);
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    const { setShowPopUp } = useContext(Context);

    return (
        <div className={`absolute top-0 left-0 z-30 h-screen w-screen bg-[#62626225] backdrop-blur-xs`}>
            <div className={`flex flex-col items-center pop-up w-8/10 h-5/10 -translate-y-10 md:translate-y-0 md:h-7/10 md:w-23/100`}>
                <div className="w-full flex justify-between h-fit text-2xl items-center">
                    {/* <p className='bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] [text-shadow:1px_2px_0_#acdda8] bg-[#d7ead5] border border-b-0 rounded-b-none rounded-xl px-2 p-1 border-[#0000004d] text-[#234120]'>
                            Login
                        </p> */}
                    <button onClick={() => { setShowPopUp(null) }} className='cursor-pointer ml-auto bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] h-full bg-[#d7ead5] border border-b-0 rounded-b-none rounded-xl px-2 p-1 flex items-center border-[#0000004d]'>
                        <img src={closeIcon} className='filter drop-shadow-[0_4px_0_#acdda8] filter-green size-5' alt="Close" />
                    </button>
                </div>
                <div className='overflow-hidden shadow-[0_4px_0_0_#234120] flex flex-col h-full w-full items-center border border-[#0000004d] bg-[#d7ead5] rounded-tr-none  rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] bg-size-[30px_30px]'>
                    <div className='w-full h-3/10 p-2 md:p-3 flex flex-col gap-1 md:gap-2 items-center justify-start'>
                        <div className='flex flex-row pt-3 md:pt-0 md:flex-col gap-2 h-fit w-full justify-center items-center'>
                            <img src="/logo.svg" className='size-[calc(2rem+0.4vw)]' />
                            <div className='h-fit'>
                                <p className='text-3xl md:text-4xl'>Login</p>
                            </div>
                        </div>
                        <p className='text-balance text-center'>Login to unlock full experience of W-GUESSER</p>
                    </div>
                    <div className='w-full h-7/10 p-3 pt-3 md:pt-5 flex flex-col items-center gap-5'>
                        <input type="email" name="email" id="email" placeholder='Enter your email...' className='p-2 text-xl text-[#234120] focus:outline-0 bg-[#acdda8] border-b-2 w-95/100' />
                        <input type="password" name="pass" id="pass" placeholder='Enter your password...' className='p-2 text-xl text-[#234120] focus:outline-0 bg-[#acdda8] border-b-2 w-95/100' />
                        <input className='hidden peer' value={isRememberMe} onChange={(e)=>{setIsRememberMe(prev => !prev)}} type="checkbox" name="remember" id="remember" />
                        <label className='flex items-center gap-2 w-95/100 text-[#234120] cursor-pointer' htmlFor="remember">{isRememberMe ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}Remember Me</label>
                        <button className='p-2 mt-2 shadow-[2px_3px_0_0_#acdda8] cursor-pointer bg-[#234120] text-2xl text-[#acdda8] w-95/100'>Login</button>
                        <p className='text-[#234120] -mt-2 md:mt-0'>Don't have an account <span className='bg-[#acdda8] p-0.5 shadow-[1px_2px_0_0_#234120] cursor-pointer'>Register</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login