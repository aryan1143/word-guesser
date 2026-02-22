import { useContext, useEffect, useState } from 'react'
import Context from '../../context/Context'
import { RiCloseFill } from 'react-icons/ri'
import useGetLeaderboardData from '../../hooks/useGetLeaderboardData'
import Loader from '../Loader'
import { getDataLocal } from '../../lib/localStorage'

const LeaderBoard = () => {
  const { setShowPopUp } = useContext(Context)
  const [period, setPeriod] = useState('dailyScore');
  const userId = getDataLocal('userId');

  const timePeriods = [
    { id: 'daily', value: 'dailyScore', label: 'Daily' },
    { id: 'weekly', value: 'weeklyScore', label: 'Weekly' },
    { id: 'monthly', value: 'monthlyScore', label: 'Monthly' }
  ];

  const { getLeaderboardData, loading, data } = useGetLeaderboardData(period);

  useEffect(() => {
    getLeaderboardData();
  }, [period])



  return (
    <div className={`absolute top-0 left-0 z-30 h-screen w-screen bg-[#62626225] backdrop-blur-xs`}>
      <div className={`flex flex-col items-center pop-up w-9/10 h-6/10 -translate-y-10 md:translate-y-0 md:h-7/10 md:w-40/100`}>
        <div className="w-full flex justify-between h-fit text-2xl items-center">
          <p className='bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] [text-shadow:1px_2px_0_#acdda8] bg-[#d7ead5] border border-b-0 rounded-b-none rounded-xl px-2 p-1 border-[#0000004d] text-[#234120]'>
            Leaderboard
          </p>
          <button onClick={() => { setShowPopUp(null) }} className='cursor-pointer bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] h-full bg-[#d7ead5] border border-b-0 rounded-b-none rounded-xl px-2 p-1 flex items-center border-[#0000004d]'>
            <RiCloseFill className='text-[#234120]' />
          </button>
        </div>
        <div className='overflow-hidden shadow-[0_4px_0_0_#234120] flex h-full w-full items-center border rounded-t-none border-[#0000004d] bg-[#d7ead5]  rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] bg-size-[30px_30px]'>
          <form className='flex flex-col p-3 py-5 gap-3 justify-start h-full w-fit border-r-2 border-gray-600 shadow-[2px_1px_0_0_#acdda8] text-[#234120]'>
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
                  className='w-[calc(4rem+8vw)] h-[calc(1.6rem+1vw)] bg-[#acdda8] shadow-[2px_3px_0_0_#234120] flex justify-center items-center text-xl md:text-2xl peer-checked:bg-[#234120] peer-checked:shadow-[2px_3px_0_0_#acdda8] peer-checked:text-[#acdda8] cursor-pointer transition-colors duration-100'
                  htmlFor={id}
                >
                  {label}
                </label>
              </div>
            ))}
          </form>
          <div className='flex-1 flex flex-col gap-2 h-full p-3 py-5 text-[#234120] [text-shadow:1px_2px_0_#acdda8]'>
            <div className='h-fit w-full flex justify-around md:justify-start items-center text-xl'>
              <p>Rank</p>
              <p className='md:mr-auto md:ml-10'>User Profile</p>
              <p className=''>Score</p>
            </div>
            <div className='relative overflow-y-scroll no-scrollbar flex w-full h-9/10 flex-col gap-3'>
              {loading ? <Loader isBg={false}/> :
                data && data.map((e, i) => {
                  return (
                    <div key={i} className={`h-11/100 md:h-13/100 w-full ${userId === e.id ? 'bg-[#234120] shadow-[2px_3px_0_0_#acdda8] text-[#acdda8] [text-shadow:1px_2px_0_#234100]' : 'bg-[#acdda8] shadow-[2px_3px_0_0_#234120] text-[#234120]'} flex justify-between gap-1 md:gap-3 items-center px-3`}>
                      <p className='h-fit w-1/10 text-xl'>
                        #{i+1}
                      </p>
                      <div className='flex w-70/100 md:ml-3 md:mr-auto gap-2 md:gap-3 md:w-8/10 h-full justify-start items-center md:text-xl'>
                        <div className=' justify-self-start h-85/100 md:aspect-square rounded-[50%] flex items-center justify-center overflow-hidden'>
                          <img className='h-full w-full' src={e.pfpURL} />
                        </div>
                        <p className='flex-1 truncate'>{userId === e.id ? '(You) ' + e.name : e.name || 'Player'}</p>
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