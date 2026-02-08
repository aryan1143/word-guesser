import React, { useContext } from 'react'
import { CgProfile } from "react-icons/cg";
import { MdOutlineLeaderboard, MdArrowBack } from "react-icons/md";
import { RiSettingsLine } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom';
import { GiSoundOff } from "react-icons/gi";
import { GiSoundOn } from "react-icons/gi";
import Context from '../context/Context';

const Header = () => {
  const { showPopup, setShowPopUp, setSoundOn, soundOn } = useContext(Context);
  const location = useLocation();
  const locationPath = location.pathname;

  return (
    <div className='flex z-50 gap-2 w-screen max-w-540 pt-2 md:pt-3 px-2 md-px-5'>
      <div className='shadow-[0_3px_0_0_#234120] flex gap-2 items-center justify-center px-[min(5rem,(calc(0.5rem+0.5vw)))] py-1 bg-[#acdda8] text-[calc(0.8rem+1vw)] min-w-25 min-h-10 font-bold text-[#234120] rounded-4xl cursor-pointer hover:bg-[#9ac596] duration-95 '>
        <p onClick={() => { setShowPopUp((prev) => (prev === 'Profile' ? null : 'Profile')) }} className={`pop-up-button ${locationPath === '/' ? 'animate-main-down' : 'animate-up hidden'} flex gap-1 justify-center items-center`}><img src='/profile.png' className='w-[calc(1rem+1vw)] mr-1'/> Profile</p>
        <Link to='/' className={`${locationPath === '/game-page' ? 'animate-main-up' : 'animate-down hidden'} flex gap-1 justify-center items-center`}><MdArrowBack /> Back</Link>
      </div>
      <div onClick={() => { setShowPopUp((prev) => (prev === 'LeaderBoard' ? null : 'LeaderBoard')) }} className='pop-up-button shadow-[0_3px_0_0_#234120] flex gap-2 ml-auto items-center justify-center px-[min(5rem,(calc(0.5rem+0.5vw)))] py-1 bg-[#acdda8] text-[calc(0.8rem+1vw)] min-w-25 min-h-10 font-bold text-[#234120] rounded-4xl cursor-pointer hover:bg-[#9ac596] duration-95 '>
        <MdOutlineLeaderboard />
        <p>Leaderboard</p>
      </div>
      <div onClick={() => { setSoundOn((prev) => (!prev)) }} className='pop-up-button shadow-[0_3px_0_0_#234120] flex ml-0 gap-2 items-center w-[calc(1rem+2vw)] h-[calc(1rem+2vw)] justify-center px-2 py-2 bg-[#acdda8] text-[calc(1.3rem+0.8vw)] min-w-10 min-h-10 font-bold text-[#234120] rounded-[50%] cursor-pointer hover:bg-[#9ac596] duration-95 '>
        {soundOn ? <GiSoundOn /> : <GiSoundOff />}
      </div>
      <div onClick={() => { setShowPopUp((prev) => (prev === 'Settings' ? null : 'Settings')) }} className='pop-up-button shadow-[0_3px_0_0_#234120] flex ml-0 gap-2 items-center w-[calc(1rem+2vw)] h-[calc(1rem+2vw)] justify-center px-2 py-2 bg-[#acdda8] text-[calc(1.3rem+0.8vw)] min-w-10 min-h-10 font-bold text-[#234120] rounded-[50%] cursor-pointer hover:bg-[#9ac596] duration-95 '>
        <RiSettingsLine />
      </div>
    </div>
  )
}

export default Header