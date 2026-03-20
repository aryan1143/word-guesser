import React, { useContext, useState } from 'react'
import LoginContext from "../context/LoginContext";
import { MdOutlineLeaderboard, MdArrowBack } from "react-icons/md";
import { RiSettingsLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GiSoundOff } from "react-icons/gi";
import { GiSoundOn, GiSandsOfTime } from "react-icons/gi";
import { MdTimer } from "react-icons/md";
import Context from '../context/Context';
import useDialog from '../hooks/useDialog';
import ChallengeContext from '../context/ChallengeContext';
import { useGlobalTimer } from '../context/TimerContext';
import { getDataLocal } from '../lib/localStorage';

const Header = () => {
  const { setShowPopUp, setSoundOn, soundOn, challengeId, isTimed } = useContext(Context);
  const { isLoggedIn } = useContext(LoginContext);
  const { exitChallenge } = useContext(ChallengeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const locationPath = location.pathname;

  const { confirmBox, alertBox } = useDialog();

  const { remainingTime, pauseTimer, resumeTimer, isRunning } = useGlobalTimer();

  async function handleLeaveChallenge() {
    if (!challengeId) return;
    const result = await confirmBox('Are you sure you want to leave the challenge!');
    if (result) {
      exitChallenge(challengeId);
      navigate('/');
    }
  }

  async function handleBack() {
    const result = await confirmBox('Are you sure you want to leave wordle!');
    if (result) {
      navigate('/');
    }
  }

  function handleTimerClick() {
    if (challengeId) {
      alertBox('You can not pause the timer in challlenge!');
      return;
    }
    isRunning ? pauseTimer() : resumeTimer();
  }

  return (
    <div className='flex z-50 gap-2 w-screen max-w-540 pt-2 md:pt-3 px-2 md-px-5'>
      <div className='shadow-[2px_3px_0_0_#234120] dark:shadow-[2px_3px_0_0_#000000] flex gap-2 items-center justify-center px-[min(5rem,(calc(0.5rem+0.5vw)))] py-1 bg-[#acdda8] dark:bg-[#4a7c52] text-[calc(0.8rem+1vw)] min-w-25 min-h-10 font-bold text-[#234120] dark:text-[#e0e8f0] rounded-4xl cursor-pointer hover:bg-[#9ac596] dark:hover:bg-[#5d8d65] duration-95 '>
        <p onClick={() => { setShowPopUp((prev) => (prev === 'Profile' ? null : 'Profile')) }} className={`pop-up-button ${locationPath === '/' ? 'animate-main-down' : 'animate-up hidden'} flex gap-1 justify-center items-center text-[#234120] dark:text-[#e0e8f0]`}><img src='/profile.png' className='w-[calc(1rem+1vw)] mr-1 dark:invert dark:hue-rotate-180' />{isLoggedIn ? 'Profile' : 'Login'}</p>
        {challengeId ?
          <button className={`${locationPath !== '/' ? 'animate-main-up' : 'animate-down hidden'} flex gap-1 justify-center items-center`} onClick={handleLeaveChallenge}><MdArrowBack /> Leave</button>
          :
          <button onClick={handleBack} className={`${locationPath !== '/' ? 'animate-main-up' : 'animate-down hidden'} flex gap-1 justify-center items-center`}><MdArrowBack /> Back</button>
        }
      </div>
      {isTimed ?
        <div onClick={handleTimerClick} className={`pop-up-button shadow-[2px_3px_0_0_#234120] dark:shadow-[2px_3px_0_0_#000000] flex gap-1 ml-auto items-center justify-center w-[calc(7rem+7vw)] py-1 bg-[#acdda8] dark:bg-[#4a7c52] text-[calc(0.8rem+1vw)] min-w-25 min-h-10 font-bold ${isRunning ? 'text-[#234120] dark:text-[#e0e8f0]' : 'text-[#234120c5] dark:text-[#b0bcc9]'} rounded-4xl hover:bg-[#9ac596] dark:hover:bg-[#5d8d65] duration-95 `}>
          <MdTimer />
          <p>Timer: {remainingTime}</p>
        </div>
        :
        <div onClick={() => { setShowPopUp((prev) => (prev === 'LeaderBoard' ? null : 'LeaderBoard')) }} className='pop-up-button shadow-[2px_3px_0_0_#234120] dark:shadow-[2px_3px_0_0_#000000] flex gap-2 ml-auto items-center justify-center px-[min(5rem,(calc(0.5rem+0.5vw)))] py-1 bg-[#acdda8] dark:bg-[#4a7c52] text-[calc(0.8rem+1vw)] min-w-25 min-h-10 font-bold text-[#234120] dark:text-[#e0e8f0] rounded-4xl cursor-pointer hover:bg-[#9ac596] dark:hover:bg-[#5d8d65] duration-95 '>
          <MdOutlineLeaderboard />
          <p>Leaderboard</p>
        </div>
      }
      <div onClick={() => { setSoundOn((prev) => (!prev)) }} className='pop-up-button shadow-[2px_3px_0_0_#234120] dark:shadow-[2px_3px_0_0_#000000] flex ml-0 gap-2 items-center w-[calc(1rem+2vw)] h-[calc(1rem+2vw)] justify-center px-2 py-2 bg-[#acdda8] dark:bg-[#4a7c52] text-[calc(1.3rem+0.8vw)] min-w-10 min-h-10 font-bold text-[#234120] dark:text-[#e0e8f0] rounded-[50%] cursor-pointer hover:bg-[#9ac596] dark:hover:bg-[#5d8d65] duration-95 '>
        {soundOn ? <GiSoundOn /> : <GiSoundOff />}
      </div>
      <div onClick={() => { setShowPopUp((prev) => (prev === 'Settings' ? null : 'Settings')) }} className='pop-up-button shadow-[2px_3px_0_0_#234120] dark:shadow-[2px_3px_0_0_#000000] flex ml-0 gap-2 items-center w-[calc(1rem+2vw)] h-[calc(1rem+2vw)] justify-center px-2 py-2 bg-[#acdda8] dark:bg-[#4a7c52] text-[calc(1.3rem+0.8vw)] min-w-10 min-h-10 font-bold text-[#234120] dark:text-[#e0e8f0] rounded-[50%] cursor-pointer hover:bg-[#9ac596] dark:hover:bg-[#5d8d65] duration-95 '>
        <RiSettingsLine />
      </div>
    </div>
  )
}

export default Header