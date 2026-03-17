import React, { useContext, useState } from 'react'
import Context from '../../context/Context';
import pfpImages from '../../lib/pfpImages.json';
import { MdArrowBack } from "react-icons/md";
import Loader from '../Loader';
import { IoIosLock } from "react-icons/io";
import useUpdateProfileData from '../../hooks/useUpdateProfileData';
import { RiCloseFill } from 'react-icons/ri';
import { useAchivements } from '../../context/AchivementContext';
import useDialog from '../../hooks/useDialog';

const PfpSelector = () => {
    const [isInAchievement, setIsInAchievement] = useState(true);

    const { setShowPopUp, showToastMessege } = useContext(Context);

    const { unlockedPfps } = useAchivements();

    const { alertBox } = useDialog();

    const pfps = pfpImages;
    const { updateProfile, loading, isSuccess } = useUpdateProfileData();
    if (!loading && isSuccess) {
        setShowPopUp('Profile');
        showToastMessege('PFP changed ✅');
    }

    const handlePfpSelect = (pfpObj, type) => {
        if (type === 'achievement') {

            if (!pfpObj) return;
    
            if (!unlockedPfps?.[pfpObj.id]) {
                alertBox(pfpObj.requirement);
                return;
            }
        }

        updateProfile('pfpURL', pfpObj.pfp);
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
                <div className='relative p-3 pt-1 overflow-y-scroll no-scrollbar text-[#234120] felx flex-col shadow-[0_4px_0_0_#234120] h-full w-full items-center border rounded-t-none border-[#0000004d] bg-[#d7ead5]  rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] bg-size-[30px_30px]'>
                    <form className='sticky top-0 left-0 z-2 w-full h-15/100 mb-1 flex justify-around items-center gap-5 px-2 backdrop-blur-sm bg-[#ffffff40]'>
                        <div className='flex-1'>
                            <input
                                className='peer sr-only'
                                id="achievement"
                                checked={isInAchievement === true}
                                value="true"
                                type="radio"
                                name='type'
                                onChange={(e) => setIsInAchievement(e.target.value === "true")}
                            />
                            <label
                                className='flex-1 py-1 bg-[#acdda8] shadow-[2px_3px_0_0_#234120] flex justify-center items-center text-xl md:text-2xl peer-checked:bg-[#234120] peer-checked:shadow-[2px_3px_0_0_#acdda8] peer-checked:text-[#acdda8] cursor-pointer transition-colors duration-100'
                                htmlFor="achievement"
                            >
                                ACHIEVEMENT PFP
                            </label>
                        </div>
                        <div className='flex-1'>
                            <input
                                className='peer sr-only'
                                id="free"
                                checked={isInAchievement === false}
                                value="false"
                                type="radio"
                                name='type'
                                onChange={(e) => setIsInAchievement(e.target.value === "true")}
                            />
                            <label
                                className='flex-1 py-1 bg-[#acdda8] shadow-[2px_3px_0_0_#234120] flex justify-center items-center text-xl md:text-2xl peer-checked:bg-[#234120] peer-checked:shadow-[2px_3px_0_0_#acdda8] peer-checked:text-[#acdda8] cursor-pointer transition-colors duration-100'
                                htmlFor="free"
                            >
                                FREE PFP
                            </label>
                        </div>
                    </form>
                    {!isInAchievement ?
                        <div className='gap-y-3 pb-1 grid grid-cols-3 md:grid-cols-4'>
                            {pfps.normalPfp.map((obj) => {
                                return (
                                    <div key={obj.name} onClick={() => handlePfpSelect(obj, 'free')} className='flex flex-col items-center justify-center hover:scale-105'>
                                        <div className='relative md:w-9/10 cursor-pointer w-9/10 aspect-square rounded-[50%] overflow-hidden border-3 border-[#234120] shadow-[2px_3px_0_0_#acdda8]'>
                                            <img src={obj.pfp} border="0" />
                                        </div>
                                        <p>{obj.name}</p>
                                    </div>)
                            })}
                        </div> :
                        <div className='gap-y-3 grid grid-cols-3 md:grid-cols-4'>
                            {pfps.achievementPfps.map((obj) => {
                                const isUnlocked = unlockedPfps?.[obj.id];
                                return (
                                    <div key={obj.name} onClick={() => handlePfpSelect(obj, 'achievement')} className='flex flex-col items-center justify-center hover:scale-105'>
                                        <div className='relative md:w-9/10 cursor-pointer w-9/10 aspect-square rounded-[50%] overflow-hidden border-3 border-[#234120] shadow-[2px_3px_0_0_#acdda8]'>
                                            <img src={obj.pfp} border="0" />
                                            {!isUnlocked && <div className='flex justify-start text-xl items-center flex-col absolute bottom-0 left-0 w-full h-4/10 bg-[#acdda8b1]'>
                                                <p className='-mt-1.5'>Locked</p>
                                                <IoIosLock className='-mt-1' />
                                            </div>}
                                        </div>
                                        <p>{obj.name}</p>
                                    </div>)
                            })}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default PfpSelector