import React from 'react'

const GameMode = () => {
  return (
    <div className={`absolute top-0 left-0 z-30 h-screen w-screen bg-[#62626225] backdrop-blur-xs`}>
      <div className={`shadow-[0_4px_0_0_#234120] flex justify-center gap-5 items-center border pop-up border-[#0000004d] bg-[#d7ead5] w-9/10 h-6/10 -translate-y-10 md:translate-y-0 md:h-7/10 md:w-6/10 rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] bg-size-[30px_30px]`}>
        <div className='flex flex-col items-center pt-3 justify-around w-28/100 h-8/10 rounded-xl bg-[#82aa7d]'>
          <div className='h-4/10 w-9/10 rounded-2xl bg-[#acdda8]'>
            <p className='h-full w-full text-center flex items-center p-2 text-6xl text-[#234120]'>Word Of The Day</p>
          </div>
          <div className='flex-1 p-2 pt-4 flex flex-col gap-3 text-[1.1rem]'>
            <p>
              Lorem ipsum dolor sit amet.
            </p>
            <p>
              Lorem ipsum dolor sit amet.
            </p>
            <p>
              Lorem ipsum dolor sit amet.
            </p>
          </div>
          <div className='flex w-full justify-around p-3 pb-5 gap-3 text-xl'>
              <button className='w-[6vw] h-[calc(1rem+3vh)] bg-[#234120] text-[#acdda8] cursor-pointer'>Play</button>
              <button className='w-[6vw] h-[calc(1rem+3vh)] text-[#234120] bg-[#acdda8] cursor-pointer'>Help</button>
          </div>
        </div>
        <div className='flex flex-col items-center pt-3 justify-around w-28/100 h-8/10 rounded-xl bg-[#82aa7d]'>
          <div className='h-4/10 w-9/10 rounded-2xl bg-[#acdda8]'>
            <p className='h-full w-full text-center flex items-center p-2 text-6xl text-[#234120]'>Word Of The Day</p>
          </div>
          <div className='flex-1 p-2 pt-4 flex flex-col gap-3 text-[1.1rem]'>
            <p>
              Lorem ipsum dolor sit amet.
            </p>
            <p>
              Lorem ipsum dolor sit amet.
            </p>
            <p>
              Lorem ipsum dolor sit amet.
            </p>
          </div>
          <div className='flex w-full justify-around p-3 pb-5 gap-3 text-xl'>
              <button className='w-[6vw] h-[calc(1rem+3vh)] bg-[#234120] text-[#acdda8] cursor-pointer'>Play</button>
              <button className='w-[6vw] h-[calc(1rem+3vh)] text-[#234120] bg-[#acdda8] cursor-pointer'>Help</button>
          </div>
        </div>
        <div className='flex flex-col items-center pt-3 justify-around w-28/100 h-8/10 rounded-xl bg-[#82aa7d]'>
          <div className='h-4/10 w-9/10 rounded-2xl bg-[#acdda8]'>
            <p className='h-full w-full text-center flex items-center p-2 text-6xl text-[#234120]'>Word Of The Day</p>
          </div>
          <div className='flex-1 p-2 pt-4 flex flex-col gap-3 text-[1.1rem]'>
            <p>
              Lorem ipsum dolor sit amet.
            </p>
            <p>
              Lorem ipsum dolor sit amet.
            </p>
            <p>
              Lorem ipsum dolor sit amet.
            </p>
          </div>
          <div className='flex w-full justify-around p-3 pb-5 gap-3 text-xl'>
              <button className='w-[6vw] h-[calc(1rem+3vh)] bg-[#234120] text-[#acdda8] cursor-pointer'>Play</button>
              <button className='w-[6vw] h-[calc(1rem+3vh)] text-[#234120] bg-[#acdda8] cursor-pointer'>Help</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameMode