import React, { useContext, useEffect, useState } from 'react'
import closeIcon from '/close-icon48.png'
import Context from '../../context/Context'
import Chart from '../Chart'
import { LuLogOut } from "react-icons/lu";
import LoginContext from '../../context/LoginContext';
import { getDataLocal, removeDataLocal, setDataLocal } from '../../lib/localStorage';
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const { setShowPopUp } = useContext(Context);
  const { setIsLoggedIn } = useContext(LoginContext);
  const [formattedDate, setFormattedDate] = useState('__-__-____');
  const [cleanName, setCleanName] = useState('');
  const [pfpURL, setPfpURL] = useState('');
  const [streak, setStreak] = useState(0);


  const handleLogOut = () => {
    const result = confirm("Are you sure you want to logout.");
    if (result) {
      setIsLoggedIn(false);
      setDataLocal("isLoggedIn", false);
    }
  }

  function changePfp() {
    setShowPopUp("pfpSelect");
  }

  useEffect(() => {
    const userData = getDataLocal("userData");
    const date = new Date(userData.createdAt.seconds * 1000);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    setPfpURL(userData.pfpURL);
    setFormattedDate(date.toLocaleDateString('en-GB', options).replace(/ /g, '-'));
    const rawName = userData.email.split('@')[0];
    const cleanname = rawName
      .replace(/[._]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
      setCleanName(userData.name ? userData.name : cleanname);
      setStreak(userData.streak);
  }, [])


  return (
    <div className={`absolute top-0 left-0 z-30 h-screen w-screen bg-[#62626225] backdrop-blur-xs`}>
      <div className={`flex flex-col items-center pop-up w-9/10 h-6/10 -translate-y-10 md:translate-y-0 md:h-7/10 md:w-40/100`}>
        <div className="w-full flex justify-between h-fit text-2xl items-center">
          <p className='bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] [text-shadow:1px_2px_0_#acdda8] bg-[#d7ead5] border border-b-0 rounded-b-none rounded-xl px-2 p-1 border-[#0000004d] text-[#234120]'>
            Profile
          </p>
          <button onClick={() => { setShowPopUp(null) }} className='cursor-pointer bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] h-full bg-[#d7ead5] border border-b-0 rounded-b-none rounded-xl px-2 p-1 flex items-center border-[#0000004d]'>
            <img src={closeIcon} className='filter drop-shadow-[0_4px_0_#acdda8] filter-green size-5' alt="Close" />
          </button>
        </div>
        <div className='overflow-hidden shadow-[0_4px_0_0_#234120] flex flex-col md:flex-row h-full w-full items-center border rounded-t-none border-[#0000004d] bg-[#d7ead5]  rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] bg-size-[30px_30px]'>
          <div className='text-2xl flex flex-row md:flex-col p-3 py-5 pb-1 gap-3 justify-start items-center h-32/100 md:h-full w-full md:w-35/100 border-b-2 border-r-0 md:border-b-0 md:border-r-2 border-gray-600 shadow-[0px_2px_0_0_#acdda8] md:shadow-[2px_1px_0_0_#acdda8] text-[#234120]'>
            <div className='relative flex justify-center items-center md:w-8/10 h-8/10 md:h-fit'>
              <div className='md:w-full h-full md:h-fit aspect-square rounded-[50%] overflow-hidden border-3 border-[#234120] shadow-[2px_3px_0_0_#acdda8]'>
                <img src={pfpURL} border="0" />
              </div>
              <button onClick={changePfp} className='absolute pl-0.5 pb-0.5 cursor-pointer text-xl flex items-center justify-center bg-[#acdda8] rounded-sm top-[86%] left-[70%] -translate-x-[50%] shadow-[1px_1px_0_0_#234120]'>
                <FaEdit />
              </button>
            </div>
            <div className='flex flex-col md:items-center justify-center h-full md:h-fit w-fit'>
              <p className='[text-shadow:1px_2px_0_#acdda8] md:text-3xl'>{cleanName}</p>
              <p className='text-[calc(1rem+0.3vw)] [text-shadow:1px_2px_0_#acdda8]'>Joined: {formattedDate}</p>
              <div className='flex flex-row md:flex-col gap-2'>
                <div className='mt-2 flex gap-1 md:gap-3 justify-center items-center text-2xl md:text-3xl'>
                  <img src="/streak.png" className='w-[calc(1.5rem+1vw)] -mt-1' />
                  <p className='[text-shadow:1px_2px_0_#acdda8]'>{streak} Days</p>
                </div>
                <div className='mt-2 flex gap-1 md:gap-3 justify-center items-center text-2xl md:text-3xl'>
                  <img src="/rank.png" className='w-[calc(1.3rem+1vw)] -mt-1' />
                  <p className='[text-shadow:1px_2px_0_#acdda8]'>Rank --</p>
                </div>
              </div>
              <button onClick={handleLogOut} className='md:flex hidden w-fit p-0.5 px-2 cursor-pointer self-center md:mt-5 rounded-md gap-1 justify-end items-center text-2xl text-[#acdda8] bg-[#234120]'>
                <p>Logout</p>
                <LuLogOut />
              </button>
            </div>
          </div>
          <div className='flex flex-col h-68/100 w-full md:h-full md:w-65/100 p-5 bg-[#d7ead5]'>
            <div className='flex justify-between w-full'>
              <select className='w-fit text-[#acdda8] bg-[#234120] px-2 py-1 active:outline-0 focus:outline-0  text-xl rounded-md' name="period">
                <option value="current">This Week</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
              </select>
              <button onClick={handleLogOut} className='flex md:hidden w-fit p-1 cursor-pointer self-end md:self-center md:mt-5 rounded-md gap-1 justify-center items-center text-xl text-[#acdda8] bg-[#234120]'>
                <LuLogOut />
              </button>
            </div>
            <Chart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile