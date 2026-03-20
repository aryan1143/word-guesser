import { Link } from 'react-router-dom'
import logo from '/logo.svg'
import Grid from '../components/Grid'
import { useContext, useEffect } from 'react'
import Context from '../context/Context'
import { randomWord } from '../components/utils/wordUtil'
import WordsContext from '../context/WordsContext'
import { getDataLocal, removeDataLocal } from '../lib/localStorage'
import useDialog from '../hooks/useDialog'
import useChallengeWordle from '../hooks/useChallengeWordle'
import { useGlobalTimer } from '../context/TimerContext'

const HomePage = () => {

  const { setShowPopUp, setIsTimed, setInDailyWordle } = useContext(Context);
  const {setTargetWord, setAllWords, setAllWordsState, setSubmitedRowNo, setLetterIndex} = useContext(WordsContext);
  const {confirmBox} = useDialog();

  const {exitChallenge} = useChallengeWordle();

  const {resetTimer} = useGlobalTimer();

  useEffect(() => {
    setIsTimed(false);
    resetTimer();
    setInDailyWordle(false);
  }, [])
  

  const targetWord = 'GUESS';
  const allWordsSample = [
    'GLUES',
    'GUEST',
    'GUESS',
    '-----',
    '-----',
    '-----'
  ]

  const challengeId = getDataLocal('challengeId');

  async function handleOnClick() {
    if (challengeId) {
      const result = await confirmBox('Previous challenge is ongoing, want to continue ?');
      if (result) return;
    }
    exitChallenge();
    removeDataLocal('challengeId');
    const word = randomWord();
    setTargetWord(word);
    setShowPopUp(null);
    setAllWords([
      '-----', '-----', '-----', '-----', '-----', '-----'
    ]);
    setAllWordsState(['', '', '', '', '', '']);
    setLetterIndex(0);
    setSubmitedRowNo(0);
    console.log(word)
  }

  return (
    <>
      <div className='flex w-screen pl-15 pr-15 overflow-hidden h-screen max-w-540'>
        <div className='flex flex-col items-center justify-center w-full md:w-6/10'>
          <div className='w-9/10 flex flex-col md:flex-row md:justify-around justify-center items-center gap-5'>
            <img src={logo} className='md:drop-shadow-[0_2px_0_#234120] dark:md:drop-shadow-[0_2px_0_#1a1f24] drop-shadow-[0_1px_0_#234120] dark:drop-shadow-[0_1px_0_#1a1f24] md:w-[calc(3rem+7vw)] w-[calc(5rem+7vw)] ' />
            <div className='flex gap-2 md:gap-0 flex-col items-center md:items-start'>
              <h2 className='text-[min(calc(1rem+1.7vw),4rem)] font-semibold -mb-5 text-[#497345] dark:text-[#5a9d65]'>Guess The Word</h2>
              <h1 className='text-[min(calc(1rem+6vw),6rem)] font-bold text-[#234120] dark:text-[#7fb877]'>W-GUESSER</h1>
            </div>
          </div>
          <div className='flex flex-col md:flex-row justify-start p-5 items-center w-9/10 py-8 gap-7'>
            <Link onClick={handleOnClick} to='/game-page' className='shadow-[0_4px_0_0_#acdda8] dark:shadow-[0_3px_0_0_#acdda8] px-[min(7rem,(calc(1rem+4vw)))] py-4 bg-[#325b2e] dark:bg-[#4a7c52] flex justify-center items-center text-2xl md:text-5xl min-h-9 min-w-60 md:min-h-18 font-bold text-[#d6fad3] dark:text-[#e0e8f0] rounded-4xl cursor-pointer hover:bg-[#294b26] dark:hover:bg-[#5d8d65] active:translate-y-0.5 duration-95'>Play</Link>
            <button onClick={() => { setShowPopUp((prev) => (prev === 'GameMode' ? null : 'GameMode')) }} className='pop-up-button shadow-[0_3px_0_0_#234120] dark:shadow-[0_2px_0_0_#acdda8] px-[min(7rem,(calc(0.5rem+1vw)))] py-4 bg-[#acdda8] dark:bg-[#4a7c52] text-2xl md:text-5xl min-h-9 min-w-60 md:min-h-18 font-bold text-[#234120] dark:text-[#e0e8f0] rounded-4xl cursor-pointer hover:bg-[#9ac596] dark:hover:bg-[#5d8d65] active:translate-0.5 duration-95'>Game Mode</button>
          </div>
        </div>
        <div className='w-4/10 h-full hidden md:flex flex-col items-end'>
          <div className='mt-5 h-screen w-fit flex flex-col gap-5 justify-start items-start py-10 px-15 bg-white dark:bg-[#1d2532] rounded-t-2xl shadow-sm dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] animate-slide-up'>
            <div className='flex items-center gap-3 w-fit h-fit'>
              <img src={logo} className='w-[calc(0.5rem+2vw)]' />
              <p className='text-3xl font-bold text-[#234120] dark:text-[#e0e8f0]'>W-GUESSER</p>
            </div>
            <Grid isBigTiles={true} sampleWords={allWordsSample} targetWord={targetWord} isSample={true} />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage