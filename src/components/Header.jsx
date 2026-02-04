import React from 'react'
import { GrPieChart } from "react-icons/gr";
import { MdOutlineLeaderboard } from "react-icons/md";
import { RiSettingsLine } from "react-icons/ri";

const Header = () => {
  return (
    <div className='flex gap-2 w-screen max-w-540 pt-5 pl-5'>
      <div className='flex gap-2 items-center justify-center px-[min(5rem,(calc(0.5rem+0.5vw)))] py-1 bg-[#acdda8] text-2xl min-w-25 min-h-12 font-bold text-[#234120] rounded-4xl cursor-pointer hover:bg-[#9ac596] duration-95 '>
        <GrPieChart />
        <p>Statistics</p>
      </div>
      <div className='flex gap-2 items-center justify-center px-[min(5rem,(calc(0.5rem+0.5vw)))] py-1 bg-[#acdda8] text-2xl min-w-25 min-h-12 font-bold text-[#234120] rounded-4xl cursor-pointer hover:bg-[#9ac596] duration-95 '>
        <MdOutlineLeaderboard />
        <p>Leaderboard</p>
      </div>
      <div className='flex gap-2 items-center justify-center px-1 py-1 bg-[#acdda8] text-3xl min-w-12 min-h-12 font-bold text-[#234120] rounded-4xl cursor-pointer hover:bg-[#9ac596] duration-95 '>
        <RiSettingsLine />
      </div>
      <div></div>
    </div>
  )
}

export default Header