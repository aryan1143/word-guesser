import React, { useContext, useState } from 'react'
import Context from '../../context/Context';
import pfpImages from '../../lib/pfpImages.json';
import { MdArrowBack } from "react-icons/md";
import Loader from '../Loader';
import { IoIosLock } from "react-icons/io";
import useUpdateProfileData from '../../hooks/useUpdateProfileData';
import { RiCloseFill } from 'react-icons/ri';

const PfpSelector = () => {
    const { setShowPopUp } = useContext(Context);

    const pfps = pfpImages;
    const { updateProfile, loading, isSuccess } = useUpdateProfileData();
    if (!loading && isSuccess) {
        setShowPopUp('Profile');
    }


    return (
        <div className={`absolute top-0 left-0 z-30 h-screen w-screen bg-[#62626225] backdrop-blur-xs`}>
            <div className={`flex flex-col items-center pop-up w-9/10 h-6/10 -translate-y-10 md:translate-y-0 md:h-7/10 md:w-30/100`}>
                <div className="w-full flex justify-between h-fit text-2xl items-center">
                    <p className='flex items-center gap-1 bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] [text-shadow:1px_2px_0_#acdda8] bg-[#d7ead5] border border-b-0 rounded-b-none rounded-xl px-2 p-1 border-[#0000004d] text-[#234120]'>
                        <button className='cursor-pointer' onClick={() => setShowPopUp('Profile')}>
                            <MdArrowBack />
                        </button>
                        Select PFP
                    </p>
                    <button onClick={() => { setShowPopUp(null) }} className='cursor-pointer bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] h-full bg-[#d7ead5] border border-b-0 rounded-b-none rounded-xl px-2 p-1 flex items-center border-[#0000004d]'>
                        <RiCloseFill className='text-[#234120]' />
                    </button>
                </div>
                {loading && <Loader />}
                <div className='p-3 overflow-y-scroll no-scrollbar text-[#234120] felx flex-col shadow-[0_4px_0_0_#234120] h-full w-full items-center border rounded-t-none border-[#0000004d] bg-[#d7ead5]  rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] bg-size-[30px_30px]'>
                    <p className='p-1 px-2 text-xl font-bold [text-shadow:1px_2px_0_#acdda8]'>PFP STORE</p>
                    <div className='gap-y-3 pb-1 grid grid-cols-3 md:grid-cols-4'>
                        {pfps.normalPfp.map((obj) => {
                            return (
                                <div key={obj.name} onClick={() => { updateProfile('pfpURL', obj.pfp) }} className='flex flex-col items-center justify-center hover:scale-105'>
                                    <div className='relative md:w-9/10 cursor-pointer w-9/10 aspect-square rounded-[50%] overflow-hidden border-3 border-[#234120] shadow-[2px_3px_0_0_#acdda8]'>
                                        <img src={obj.pfp} border="0" />
                                        <div className='flex justify-start text-xl items-center flex-col absolute bottom-0 left-0 w-full h-4/10 bg-[#d6c1e0c1]'>
                                            <p className='-mt-1.5'>Locked</p>
                                            <IoIosLock className='-mt-1' />
                                        </div>
                                    </div>
                                    <p>{obj.name}</p>
                                </div>)
                        })}
                    </div>
                    <p className='p-1 px-2 text-xl font-bold [text-shadow:1px_2px_0_#acdda8]'>PFP ACHIVEMENTS</p>
                    <div className='gap-y-3 grid grid-cols-3 md:grid-cols-4'>
                        {pfps.achivementPfps.map((obj) => {
                            return (
                                <div key={obj.name} onClick={() => { updateProfile('pfpURL', obj.pfp) }} className='flex flex-col items-center justify-center hover:scale-105'>
                                    <div className='relative md:w-9/10 cursor-pointer w-9/10 aspect-square rounded-[50%] overflow-hidden border-3 border-[#234120] shadow-[2px_3px_0_0_#acdda8]'>
                                        <img src={obj.pfp} border="0" />
                                        <div className='flex justify-start text-xl items-center flex-col absolute bottom-0 left-0 w-full h-4/10 bg-[#acdda8b1]'>
                                            <p className='-mt-1.5'>Locked</p>
                                            <IoIosLock className='-mt-1' />
                                        </div>
                                    </div>
                                    <p>{obj.name}</p>
                                </div>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PfpSelector