import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import Grid from '../components/Grid'
import Header from '../components/Header'

const HomePage = () => {

  const targetWord = 'GUESS';
  const allWordsSample = [
    'GLUES',
    'GUEST',
    'GUESS',
    '-----',
    '-----',
    '-----'
  ]


  return (
    <>
      <div className='flex w-screen pl-15 pr-15 overflow-hidden h-screen max-w-540'>
        <div className='flex flex-col items-center justify-center w-full md:w-6/10'>
          <div className='w-9/10 flex flex-col md:flex-row md:justify-around justify-center items-center gap-5'>
            <img src={logo} className='md:drop-shadow-[0_2px_0_#234120] drop-shadow-[0_1px_0_#234120] md:w-[calc(3rem+7vw)] w-[calc(5rem+7vw)] ' />
            <div className='flex gap-2 md:gap-0 flex-col items-center md:items-start'>
              <h2 className='text-[min(calc(1rem+1.5vw),4rem)] font-semibold -mb-4 text-[#497345]'>Guess The Word</h2>
              <h1 className='text-[min(calc(1rem+5vw),6rem)] font-bold text-[#234120]'>W-GUESSER</h1>
            </div>
          </div>
          <div className='flex flex-col md:flex-row justify-start p-5 items-center w-9/10 py-8 gap-7'>
            <Link to='/game-page' className='shadow-[0_3px_0_0_#acdda8] px-[min(7rem,(calc(1rem+4vw)))] py-4 bg-[#325b2e] flex justify-center items-center text-2xl md:text-5xl min-h-9 min-w-60 md:min-h-18 font-bold text-[#d6fad3] rounded-4xl cursor-pointer hover:bg-[#294b26] active:translate-y-0.5 duration-95'>Play</Link>
            <button  className='shadow-[0_2px_0_0_#234120] px-[min(7rem,(calc(0.5rem+1vw)))] py-4 bg-[#acdda8] text-2xl md:text-5xl min-h-9 min-w-60 md:min-h-18 font-bold text-[#234120] rounded-4xl cursor-pointer hover:bg-[#9ac596] active:translate-0.5 duration-95'>Game Mode</button>
          </div>
        </div>
        <div className='w-4/10 h-full hidden md:flex flex-col items-end'>
          <div className='mt-5 h-screen w-fit flex flex-col gap-5 justify-start items-start py-10 px-15 bg-white rounded-t-2xl shadow-sm animate-slide-up'>
            <div className='flex items-center gap-3 w-fit h-fit'>
              <img src={logo} className='w-[calc(0.5rem+2vw)]' />
              <p className='text-3xl font-bold text-[#234120]'>W-GUESSER</p>
            </div>
            <Grid isBigTiles={true} allWords={allWordsSample} targetWord={targetWord} />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage