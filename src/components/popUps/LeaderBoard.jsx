import React, { useContext } from 'react'
import closeIcon from '/close-icon48.png'
import Context from '../../context/Context'

const LeaderBoard = () => {
  const { setShowPopUp } = useContext(Context)

  return (
    <div className={`absolute top-0 left-0 z-30 h-screen w-screen bg-[#62626225] backdrop-blur-xs`}>
      <div className={`flex flex-col items-center pop-up w-9/10 h-6/10 -translate-y-10 md:translate-y-0 md:h-7/10 md:w-40/100`}>
        <div className="w-full flex justify-between h-fit text-2xl items-center">
          <p className='bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] [text-shadow:1px_2px_0_#acdda8] bg-[#d7ead5] border border-b-0 rounded-b-none rounded-xl px-2 p-1 border-[#0000004d] text-[#234120]'>
            Leaderboard
          </p>
          <button onClick={() => { setShowPopUp(null) }} className='cursor-pointer bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] h-full bg-[#d7ead5] border border-b-0 rounded-b-none rounded-xl px-2 p-1 flex items-center border-[#0000004d]'>
            <img src={closeIcon} className='filter drop-shadow-[0_4px_0_#acdda8] filter-green size-5' alt="Close" />
          </button>
        </div>
        <div className='overflow-hidden shadow-[0_4px_0_0_#234120] flex h-full w-full items-center border rounded-t-none border-[#0000004d] bg-[#d7ead5]  rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] bg-size-[30px_30px]'>
          <div className='flex flex-col p-3 py-5 gap-3 justify-start h-full w-fit border-r-2 border-gray-600 shadow-[2px_1px_0_0_#acdda8] text-[#234120]'>
            <div>
              <input className='peer hidden' id='daily' type="radio" name='period' />
              <label className='w-[calc(4rem+8vw)] h-[calc(1.6rem+1vw)] bg-[#acdda8] shadow-[2px_3px_0_0_#234120] flex justify-center items-center text-xl md:text-2xl peer-checked:bg-[#234120] peer-checked:shadow-[2px_3px_0_0_#acdda8] peer-checked:text-[#acdda8] cursor-pointer' htmlFor="daily">
                Daily
              </label>
            </div>
            <div>
              <input className='peer hidden' id='weekly' type="radio" name='period' />
              <label className='w-[calc(4rem+8vw)] h-[calc(1.6rem+1vw)] bg-[#acdda8] shadow-[2px_3px_0_0_#234120] flex justify-center items-center text-xl md:text-2xl peer-checked:shadow-[2px_3px_0_0_#acdda8] peer-checked:bg-[#234120] peer-checked:text-[#acdda8] cursor-pointer' htmlFor="weekly">
                Weekly
              </label>
            </div>
            <div>
              <input className='peer hidden' id='monthly' type="radio" name='period' />
              <label className='w-[calc(4rem+8vw)] h-[calc(1.6rem+1vw)] bg-[#acdda8] shadow-[2px_3px_0_0_#234120] flex justify-center items-center text-xl md:text-2xl peer-checked:shadow-[2px_3px_0_0_#acdda8] peer-checked:bg-[#234120] peer-checked:text-[#acdda8] cursor-pointer' htmlFor="monthly">
                Monthly
              </label>
            </div>
          </div>
          <div className='flex-1 flex flex-col gap-2 h-full p-3 py-5 text-[#234120] [text-shadow:1px_2px_0_#acdda8]'>
            <div className='h-fit w-full flex justify-between items-center text-xl'>
              <p>Rank</p>
              <p>User Profile</p>
              <p className=''>Score</p>
            </div>
            <div className='overflow-y-scroll no-scrollbar flex w-full h-9/10 flex-col gap-3'>
              <div className='h-fit md:h-13/100 w-full bg-[#acdda8] flex justify-between gap-3 items-center px-3 shadow-[2px_3px_0_0_#234120]'>
                <p className='h-fit w-fit text-xl'>
                  #1
                </p>
                <div className='flex gap-3 w-full h-full justify-center items-center md:text-xl'>
                  <div className='h-[9vw] md:h-80/100 w-[11vw] md:w-fit md:aspect-square rounded-[50%] bg-green-500 flex items-center justify-center overflow-hidden'>
                    <img className='h-full w-full' src="defaultpfp.png" />
                  </div>
                  <p >Aryan Prajapati</p>
                </div>
                <p >85</p>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderBoard