import React, { useContext } from 'react'
import closeIcon from '../../assets/close-icon48.png'
import Context from '../../context/Context'

const GameMode = () => {
  const { setShowPopUp } = useContext(Context);


  return (
    <div className={`absolute top-0 left-0 z-30 h-screen w-screen bg-[#62626225] backdrop-blur-xs`}>
      <div className={`flex flex-col items-center pop-up w-9/10 h-6/10 -translate-y-10 md:translate-y-0 md:h-7/10 md:w-55/100`}>
        <div className="w-full flex justify-between h-fit text-2xl items-center">
          <p className='bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] [text-shadow:1px_2px_0_#acdda8] bg-[#d7ead5] border border-b-0 rounded-b-none rounded-xl px-2 p-1 border-[#0000004d] text-[#234120]'>Game Mode</p>
          <button onClick={() => { setShowPopUp(null) }} className='cursor-pointer bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] h-full bg-[#d7ead5] border border-b-0 rounded-b-none rounded-xl px-2 p-1 flex items-center border-[#0000004d]'>
            <img src={closeIcon} className='filter drop-shadow-[0_4px_0_#acdda8] filter-green size-5' alt="Close" />
          </button>
        </div>
        <div className='shadow-[0_4px_0_0_#234120] flex h-full w-full gap-5 justify-center items-center border rounded-t-none border-[#0000004d] bg-[#d7ead5]  rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] bg-size-[30px_30px]'>
          <div className='shadow-[0_4px_0_0_#234120] flex flex-col items-center pt-3 justify-around w-30/100 h-9/10 rounded-xl bg-[#accda8]'>
            <div className='shadow-[0_2px_0_0_#234120] h-4/10 w-9/10 rounded-2xl bg-[#d7ead5]'>
              <p className='h-full w-full text-center flex items-center p-2 text-5xl text-[#234120]'>Word Of The Day</p>
            </div>
            <div className='flex-1 w-9/10 p-2 pt-4 flex flex-col gap-3 text-[1.25rem] text-[#0f2c0d]'>
              <ul className='list-disc wrap-normal px-3 flex flex-col gap-1 [text-shadow:1px_1px_2px_#acdda8]'>
                <li>
                  Guess the words withing 6 tries.
                </li>
                <li>
                  There is a new word to guess each day.
                </li>
              </ul>
            </div>
            <div className='flex w-full justify-around p-3 pb-5 gap-3 text-xl'>
              <button className='w-[6vw] h-[calc(1rem+3vh)] bg-[#234120] text-[#acdda8] cursor-pointer shadow-[0_2px_0_0_#acdda8]'>Play</button>
              <button className='w-[6vw] h-[calc(1rem+3vh)] text-[#234120] bg-[#acdda8] cursor-pointer shadow-[0_2px_0_0_#234120]'>Help</button>
            </div>
          </div>
          <div className='shadow-[0_4px_0_0_#234120] flex flex-col items-center pt-3 justify-around w-30/100 h-9/10 rounded-xl bg-[#accda8]'>
            <div className='shadow-[0_2px_0_0_#234120] h-4/10 w-9/10 rounded-2xl bg-[#d7ead5]'>
              <p className='h-full w-full text-center flex justify-center items-center p-2 text-5xl text-[#234120]'>Challange With Friend</p>
            </div>
            <div className='flex-1 w-9/10 p-2 pt-4 flex flex-col gap-3 text-[1.25rem] text-[#0f2c0d]'>
              <ul className='list-disc wrap-normal px-3 flex flex-col gap-1 [text-shadow:1px_1px_2px_#acdda8]'>
                <li>
                  Guess the secret word withing 6 tries.
                </li>
                <li>
                  Play as many game as you want.
                </li>
              </ul>
            </div>
            <div className='flex w-full justify-around p-3 pb-5 gap-3 text-xl'>
              <button className='w-[6vw] h-[calc(1rem+3vh)] bg-[#234120] text-[#acdda8] cursor-pointer shadow-[0_2px_0_0_#acdda8]'>Play</button>
              <button className='w-[6vw] h-[calc(1rem+3vh)] text-[#234120] bg-[#acdda8] cursor-pointer shadow-[0_2px_0_0_#234120]'>Help</button>
            </div>
          </div>
          <div className='shadow-[0_4px_0_0_#234120] flex flex-col items-center pt-3 justify-around w-30/100 h-9/10 rounded-xl bg-[#accda8]'>
            <div className='shadow-[0_2px_0_0_#234120] h-4/10 w-9/10 rounded-2xl bg-[#d7ead5]'>
              <p className='h-full w-full text-center flex items-center p-2 text-5xl text-[#234120]'>Practice Words</p>
            </div>
            <div className='flex-1 w-9/10 p-2 pt-4 flex flex-col gap-3 text-[1.25rem] text-[#0f2c0d]'>
              <ul className='list-disc wrap-normal px-3 flex flex-col gap-1 [text-shadow:1px_1px_2px_#acdda8]'>
                <li>
                  Guess as many words within a time limit.
                </li>
                <li>
                  You have unlimited tries to guess.
                </li>
              </ul>
            </div>
            <div className='flex w-full justify-around p-3 pb-5 gap-3 text-xl'>
              <button className='w-[6vw] h-[calc(1rem+3vh)] bg-[#234120] text-[#acdda8] cursor-pointer shadow-[0_2px_0_0_#acdda8]'>Play</button>
              <button className='w-[6vw] h-[calc(1rem+3vh)] text-[#234120] bg-[#acdda8] cursor-pointer shadow-[0_2px_0_0_#234120]'>Help</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameMode