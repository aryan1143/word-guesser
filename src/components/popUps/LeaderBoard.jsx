import { useContext, useEffect, useState } from 'react'
import Context from '../../context/Context'
import { RiCloseFill } from 'react-icons/ri'
import useGetLeaderboardData from '../../hooks/useGetLeaderboardData'
import Loader from '../Loader'
import { getDataLocal } from '../../lib/localStorage'
import LoginContext from '../../context/LoginContext'

const LeaderBoard = () => {
  const { setShowPopUp } = useContext(Context)
  const [period, setPeriod] = useState('dailyScore');
  const userId = getDataLocal('userId');

  const {isLoggedIn} = useContext(LoginContext);

  const timePeriods = [
    { id: 'daily', value: 'dailyScore', label: 'Daily' },
    { id: 'weekly', value: 'weeklyScore', label: 'Weekly' },
    { id: 'monthly', value: 'monthlyScore', label: 'Monthly' }
  ];

  const { loading, data } = useGetLeaderboardData(period);

  return (
    <div className={`absolute top-0 left-0 z-30 h-screen w-screen bg-[#62626225] dark:bg-[rgba(0,0,0,0.4)] backdrop-blur-xs`}>
      <div className={`flex flex-col items-center pop-up w-9/10 h-6/10 -translate-y-10 md:translate-y-0 md:h-7/10 md:w-40/100`}>
        <div className="w-full flex justify-between h-fit text-2xl items-center">
          <p className='bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] [text-shadow:1px_2px_0_#acdda8] dark:[text-shadow:1px_2px_0_#1a1f24] bg-[#d7ead5] dark:bg-[#1d2532] border dark:border-[rgba(255,255,255,0.1)] border-b-0 rounded-b-none rounded-xl px-2 p-1 border-[#0000004d] text-[#234120] dark:text-[#e0e8f0]'>
            Leaderboard
          </p>
          <button onClick={() => { setShowPopUp(null) }} className='cursor-pointer bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] h-full bg-[#d7ead5] dark:bg-[#1d2532] border dark:border-[rgba(255,255,255,0.1)] border-b-0 rounded-b-none rounded-xl px-2 p-1 flex items-center border-[#0000004d]'>
            <RiCloseFill className='text-[#234120] dark:text-[#e0e8f0]' />
          </button>
        </div>
        <div className='relative overflow-hidden shadow-[0_4px_0_0_#234120] dark:shadow-[0_4px_0_0_#000000] flex h-full w-full items-center border dark:border-[rgba(255,255,255,0.1)] rounded-t-none border-[#0000004d] bg-[#d7ead5] dark:bg-[#1d2532]  rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[30px_30px]'>
          {!isLoggedIn && <div className="absolute flex flex-col gap-3 text-2xl justify-center items-center w-full h-full bg-[#ffffff4d] dark:bg-[#0000004d] z-100 backdrop-blur-md [text-shadow:1px_2px_0_#acdda8] dark:[text-shadow:1px_2px_0_#1a1f24]">
              <p className='dark:text-white text-[#234120]'>Login to see Leaderboard</p>
              <button onClick={() => { setShowPopUp('Login') }} className='p-1.5 px-6 mt-2 shadow-[2px_3px_0_0_#acdda8] dark:shadow-[2px_3px_0_0_#4a7c52] cursor-pointer bg-[#234120] dark:bg-[#1a1f24] text-2xl text-[#acdda8] dark:text-[#e0e8f0]'>Login</button>
          </div> }
          <form className='flex flex-col p-3 py-5 gap-3 justify-start h-full w-fit border-r-2 dark:border-[#505a6b] border-gray-600 shadow-[2px_1px_0_0_#acdda8] dark:shadow-[2px_1px_0_0_#4a7c52] text-[#234120] dark:text-[#e0e8f0]'>
            {timePeriods.map(({ id, value, label }) => (
              <div key={id}>
                <input
                  className='peer sr-only'
                  id={id}
                  checked={period === value}
                  value={value}
                  type="radio"
                  name='period'
                  onChange={(e) => setPeriod(e.target.value)}
                />
                <label
                  className='w-[calc(4rem+8vw)] h-[calc(1.6rem+1vw)] bg-[#acdda8] dark:bg-[#2a3942] shadow-[2px_3px_0_0_#234120] dark:shadow-[2px_3px_0_0_#000000] flex justify-center items-center text-xl md:text-2xl peer-checked:bg-[#234120] dark:peer-checked:bg-[#1a1f24] peer-checked:shadow-[2px_3px_0_0_#acdda8] dark:peer-checked:shadow-[2px_3px_0_0_#4a7c52] peer-checked:text-[#acdda8] dark:peer-checked:text-[#e0e8f0] cursor-pointer transition-colors duration-100'
                  htmlFor={id}
                >
                  {label}
                </label>
              </div>
            ))}
          </form>
          <div className='flex-1 flex flex-col gap-2 h-full p-3 py-5 text-[#234120] dark:text-[#e0e8f0] [text-shadow:1px_2px_0_#acdda8] dark:[text-shadow:1px_2px_0_#1a1f24]'>
            <div className='h-fit w-full flex justify-around md:justify-start items-center text-xl'>
              <p>Rank</p>
              <p className='md:mr-auto md:ml-10'>User Profile</p>
              <p className=''>Score</p>
            </div>
            <div className='relative overflow-y-scroll no-scrollbar flex w-full h-9/10 flex-col gap-3'>
              {loading ? <Loader isBg={false}/> :
                data && data.map((e, i) => {
                  const isCurrentUser = userId === e.id;
                  return (
                    <div key={i} className={`h-11/100 md:h-13/100 w-full flex justify-between gap-1 md:gap-3 items-center px-3 ${
                      isCurrentUser 
                        ? 'bg-[#234120] dark:bg-[#1a1f24] shadow-[2px_3px_0_0_#acdda8] dark:shadow-[2px_3px_0_0_#4a7c52] text-[#acdda8] dark:text-[#e0e8f0] [text-shadow:1px_2px_0_#234100] dark:[text-shadow:1px_2px_0_#1a1f24]' 
                        : 'bg-[#acdda8] dark:bg-[#2a3942] shadow-[2px_3px_0_0_#234120] dark:shadow-[2px_3px_0_0_#000000] text-[#234120] dark:text-[#e0e8f0]'
                    }`}>
                      <p className='h-fit w-1/10 text-xl'>
                        #{i+1}
                      </p>
                      <div className='flex w-70/100 md:ml-3 md:mr-auto gap-2 md:gap-3 md:w-8/10 h-full justify-start items-center md:text-xl'>
                        <div className='justify-self-start h-85/100 md:aspect-square rounded-[50%] flex items-center justify-center overflow-hidden border border-gray-400 dark:border-[#505a6b]'>
                          <img className='h-full w-full' src={e.pfpURL} />
                        </div>
                        <p className='flex-1 truncate'>{isCurrentUser ? '(You) ' + e.name : e.name || 'Player'}</p>
                      </div>
                      <p className='2/10'>{e[period]}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderBoard