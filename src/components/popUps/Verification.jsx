import React, { useContext, useState } from 'react'
import { RiCloseFill } from 'react-icons/ri'
import { app } from '../../lib/firebaseClient';
import { getAuth } from 'firebase/auth';
import Context from '../../context/Context';
import Loader from '../Loader';

const Verification = () => {
    const auth = getAuth(app);
    const { setShowPopUp } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [messege, setMessege] = useState(null);

    const handleVerified = async () => {
        setLoading(true);
        setMessege(null);
        if (auth.currentUser) {
                await auth.currentUser.reload();
                if (auth.currentUser.emailVerified) {
                    console.log("Verified!");
                    setShowPopUp('Login');
                    setLoading(false);
                } else {
                    setMessege('Email is not verified yet please check your inbox or spam folder and verify it first.');
                    setLoading(false);
                }
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
                <div className='relative overflow-hidden shadow-[0_4px_0_0_#234120] flex flex-col h-full w-full items-center border border-[#0000004d] bg-[#d7ead5] rounded-tr-none  rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] bg-size-[30px_30px]'>
                    <div className='w-full h-2/10 md:h-35/100 p-2 md:p-3 flex flex-col gap-1 md:gap-2 items-center justify-start'>
                        <div className='flex flex-row pt-3 md:pt-3 md:flex-col gap-2 h-fit w-full justify-center items-center'>
                            <img src="/logo.svg" className='size-[calc(2rem+0.4vw)]' />
                            <div className='h-fit'>
                                <p className='text-3xl md:text-4xl'>Verification</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-8/10 md:h-65/100 p-3 pt-1 md:pt-5 flex flex-col justify-start items-center gap-5'>
                        {loading ? <Loader isBg={false}/> :
                            <p className={`${messege ? 'text-[#cd0000]':'text-[#234120]'} text-2xl text-center text-balance`}>{messege ? messege : 'We have send you a verification email to your email. Please check your inbox/spam and click on verify link to verfy your email.'}</p>
                        }
                        <button onClick={handleVerified} className='mt-auto p-2 mb-2 shadow-[2px_3px_0_0_#acdda8] cursor-pointer bg-[#234120] text-2xl text-[#acdda8] w-95/100'>{loading ? 'Checking...' : 'Verified'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Verification