import React from 'react'
import { GrPieChart } from "react-icons/gr";
import { MdOutlineLeaderboard, MdArrowBack } from "react-icons/md";
import { RiSettingsLine } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const locationPath = location.pathname;

  return (
    <div className='flex gap-2 w-screen max-w-540 pt-2 md:pt-3 px-2 md-px-5'>
      <Link to={locationPath === '/game-page' ? '/' : '/game-page'} className='flex gap-2 items-center justify-center px-[min(5rem,(calc(0.5rem+0.5vw)))] py-1 bg-[#acdda8] text-[calc(0.8rem+1vw)] min-w-25 min-h-10 font-bold text-[#234120] rounded-4xl cursor-pointer hover:bg-[#9ac596] duration-95 '>
        {locationPath === '/game-page' ? <MdArrowBack /> : <GrPieChart />}
        <p>{locationPath === '/game-page' ? 'Back' : 'Stastistics'}</p>
      </Link>
      <div className='flex gap-2 items-center justify-center px-[min(5rem,(calc(0.5rem+0.5vw)))] py-1 bg-[#acdda8] text-[calc(0.8rem+1vw)] min-w-25 min-h-10 font-bold text-[#234120] rounded-4xl cursor-pointer hover:bg-[#9ac596] duration-95 '>
        <MdOutlineLeaderboard />
        <p>Leaderboard</p>
      </div>
      <div className='flex ml-auto md:ml-0 gap-2 items-center w-[calc(1rem+2vw)] h-[calc(1rem+2vw)] justify-center px-2 py-2 bg-[#acdda8] text-[calc(1.3rem+0.8vw)] min-w-10 min-h-10 font-bold text-[#234120] rounded-[50%] cursor-pointer hover:bg-[#9ac596] duration-95 '>
        <RiSettingsLine />
      </div>
      <div></div>
    </div>
  )
}

export default Header