import React, { useContext, useEffect } from 'react'
import Context from '../../context/Context'
import { RiCloseFill } from 'react-icons/ri';
import getDailyWordle from '../utils/getDailyWordle';
import WordsContext from '../../context/WordsContext';
import { useNavigate } from 'react-router-dom'
import useHandleDidDailyWordle from '../../hooks/useHandleDidDailyWordle';
import Loader from '../Loader';
import useDialog from '../../hooks/useDialog';


const GameMode = () => {
  const { setShowPopUp, setShowCreateChallenge, setInDailyWordle } = useContext(Context);
  const { setTargetWord, resetWordleData } = useContext(WordsContext);
  const navigate = useNavigate();

  const { getDidDailyWordle, loading, didDailyWordle } = useHandleDidDailyWordle();
  useEffect(() => {
    getDidDailyWordle();
    console.log(didDailyWordle)
  }, []);

  const {alertBox} = useDialog();
  

  function handlePlay(mode) {
    if (mode === 'day') {
      if (didDailyWordle ) {
        alertBox('You already tried daily wordle, come back tomorrow!');
        return;
      }
      resetWordleData();
      const wordle = getDailyWordle();
      setTargetWord(wordle);
      navigate('/game-page');
      setInDailyWordle(true);
      setShowPopUp(null);
    } else if (mode === 'challange') {
      setShowCreateChallenge(true);
      setShowPopUp(null);
    } else if (mode === 'practice') {
      setShowPopUp('GetDuration');
    }
  }


  return (
    <div className={`absolute top-0 left-0 z-30 h-screen w-screen bg-[#62626225] backdrop-blur-xs`}>
      <div className={`flex flex-col items-center pop-up w-9/10 h-6/10 -translate-y-10 md:translate-y-0 md:h-7/10 md:w-55/100`}>
        <div className="w-full flex justify-between h-fit text-2xl items-center">
          <p className='bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] [text-shadow:1px_2px_0_#acdda8] dark:[text-shadow:1px_2px_0_#1a1f24] bg-[#d7ead5] dark:bg-[#1d2532] border dark:border-[rgba(255,255,255,0.1)] border-b-0 rounded-b-none rounded-xl px-2 p-1 border-[#0000004d] text-[#234120] dark:text-[#e0e8f0]'>Game Mode</p>
          <button onClick={() => { setShowPopUp(null) }} className='cursor-pointer bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] h-full bg-[#d7ead5] dark:bg-[#1d2532] border dark:border-[rgba(255,255,255,0.1)] border-b-0 rounded-b-none rounded-xl px-2 p-1 flex items-center border-[#0000004d]'>
            <RiCloseFill className='text-[#234120] dark:text-[#e0e8f0]' />
          </button>
        </div>
        <div className='shadow-[0_4px_0_0_#234120] dark:shadow-[0_4px_0_0_#000000] flex flex-col md:flex-row h-full w-full gap-2 md:gap-5 justify-center items-center border rounded-t-none border-[#0000004d] dark:border-[rgba(255,255,255,0.1)] bg-[#d7ead5] dark:bg-[#1d2532] rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[30px_30px]'>
          <div className={`relative shadow-[0_4px_0_0_#234120] dark:shadow-[0_4px_0_0_#000000] flex flex-row md:flex-col items-evenly md:items-center pt-3 justify-evenly w-9/10 h-3/10 md:w-30/100 md:h-9/10 rounded-xl bg-[#accda8] dark:bg-[#2a3942] ${didDailyWordle && 'opacity-80'}`}>
            {loading ? <Loader isBg={false} isText={false}/> : (
              <>
                <div className="shadow-[0_2px_0_0_#234120] dark:shadow-[0_2px_0_0_#000000] h-9/10 w-45/100 md:h-4/10 md:w-9/10 rounded-2xl bg-[#e2f0e0] dark:bg-[#3a5555] bg-[url('/bg-day.png')] bg-cover">
                  <p className='h-full w-full text-center flex items-center p-2 text-3xl md:text-5xl text-[#234120] dark:text-[#e0e8f0]'>Word Of The Day</p>
                </div>
                <div className='flex-1 w-9/10 p-2 pt-4 hidden md:flex flex-col gap-3 text-[1.25rem] text-[#0f2c0d] dark:text-[#b0bcc9]'>
                  <ul className='list-disc wrap-normal px-3 flex-col gap-1 [text-shadow:1px_1px_2px_#acdda8] dark:[text-shadow:1px_1px_2px_#1a1f24]'>
                    <li>
                      Guess the words withing 6 tries.
                    </li>
                    <li>
                      There is a new word to guess each day.
                    </li>
                  </ul>
                </div>
                <div className='flex flex-col md:flex-row w-45/100 md:w-full justify-around p-3 pb-5 gap-3 text-xl'>
                  <button onClick={() => handlePlay('day')} className='flex-1 md:w-[6vw] h-[calc(1rem+3vh)] bg-[#234120] dark:bg-[#6ab878] text-[#acdda8] dark:text-[#0f1419] cursor-pointer shadow-[0_3px_0_0_#acdda8] dark:shadow-[0_3px_0_0_#000000]'>Play</button>
                  <button className='flex-1 md:w-[6vw] h-[calc(1rem+3vh)] text-[#234120] dark:text-[#e0e8f0] bg-[#acdda8] dark:bg-[#505a6b] cursor-pointer shadow-[0_2px_0_0_#234120] dark:shadow-[0_2px_0_0_#000000]'>Detail</button>
                </div>
              </>
            )}
          </div>
          <div className='shadow-[0_4px_0_0_#234120] dark:shadow-[0_4px_0_0_#000000] flex flex-row md:flex-col items-evenly md:items-center pt-3 justify-evenly w-9/10 h-3/10 md:w-30/100 md:h-9/10 rounded-xl bg-[#accda8] dark:bg-[#2a3942]'>
            <div className="shadow-[0_2px_0_0_#234120] dark:shadow-[0_2px_0_0_#000000] h-9/10 w-45/100 md:h-4/10 md:w-9/10 rounded-2xl bg-[#d7ead5] dark:bg-[#3a5555] bg-[url('/bg-friend.png')] bg-cover">
              <p className='h-full w-full text-center flex justify-center items-center p-2 text-3xl md:text-5xl text-[#234120] dark:text-[#e0e8f0]'>Challange With Friend</p>
            </div>
            <div className='flex-1 w-9/10 p-2 pt-4 hidden md:flex flex-col gap-3 text-[1.25rem] text-[#0f2c0d] dark:text-[#b0bcc9]'>
              <ul className='list-disc wrap-normal px-3 flex-col gap-1 [text-shadow:1px_1px_2px_#acdda8] dark:[text-shadow:1px_1px_2px_#1a1f24]'>
                <li>
                  Guess the secret word withing 6 tries.
                </li>
                <li>
                  Play as many game as you want.
                </li>
              </ul>
            </div>
            <div className='flex flex-col md:flex-row w-45/100 md:w-full justify-around p-3 pb-5 gap-3 text-xl'>
              <button onClick={() => handlePlay('challange')} className='flex-1 md:w-[6vw] h-[calc(1rem+3vh)] bg-[#234120] dark:bg-[#6ab878] text-[#acdda8] dark:text-[#0f1419] cursor-pointer shadow-[0_3px_0_0_#acdda8] dark:shadow-[0_3px_0_0_#000000]'>Play</button>
              <button className='flex-1 md:w-[6vw] h-[calc(1rem+3vh)] text-[#234120] dark:text-[#e0e8f0] bg-[#acdda8] dark:bg-[#505a6b] cursor-pointer shadow-[0_2px_0_0_#234120] dark:shadow-[0_2px_0_0_#000000]'>Detail</button>
            </div>
          </div>
          <div className='shadow-[0_4px_0_0_#234120] dark:shadow-[0_4px_0_0_#000000] flex flex-row md:flex-col items-evenly md:items-center pt-3 justify-evenly w-9/10 h-3/10 md:w-30/100 md:h-9/10 rounded-xl bg-[#accda8] dark:bg-[#2a3942]'>
            <div className="shadow-[0_2px_0_0_#234120] dark:shadow-[0_2px_0_0_#000000] h-9/10 w-45/100 md:h-4/10 md:w-9/10 rounded-2xl bg-[#d7ead5] dark:bg-[#3a5555] bg-[url('/bg-day.png')] bg-cover">
              <p className='h-full w-full text-center flex items-center p-2 text-3xl md:text-5xl text-[#234120] dark:text-[#e0e8f0]'>Practice Words</p>
            </div>
            <div className='flex-1 w-9/10 p-2 pt-4 hidden md:flex flex-col gap-3 text-[1.25rem] text-[#0f2c0d] dark:text-[#b0bcc9]'>
              <ul className='list-disc wrap-normal px-3 flex-col gap-1 [text-shadow:1px_1px_2px_#acdda8] dark:[text-shadow:1px_1px_2px_#1a1f24]'>
                <li>
                  Guess as many words within a time limit.
                </li>
                <li>
                  You have unlimited tries to guess.
                </li>
              </ul>
            </div>
            <div className='flex flex-col md:flex-row w-45/100 md:w-full justify-around p-3 pb-5 gap-3 text-xl'>
              <button onClick={() => handlePlay('practice')} className='flex-1 md:w-[6vw] h-[calc(1rem+3vh)] bg-[#234120] dark:bg-[#6ab878] text-[#acdda8] dark:text-[#0f1419] cursor-pointer shadow-[0_3px_0_0_#acdda8] dark:shadow-[0_3px_0_0_#000000]'>Play</button>
              <button className='flex-1 md:w-[6vw] h-[calc(1rem+3vh)] text-[#234120] dark:text-[#e0e8f0] bg-[#acdda8] dark:bg-[#505a6b] cursor-pointer shadow-[0_2px_0_0_#234120] dark:shadow-[0_2px_0_0_#000000]'>Detail</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameMode