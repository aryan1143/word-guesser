import logo from '../assets/logo.svg'
import Grid from '../components/Grid'

const HomePage = () => {
  return (
    <div className='justify-center w-screen h-screen flex bg-[#dbffd0] overflow-hidden'>
      <div className='flex w-screen pl-15 pr-15 overflow-hidden h-screen max-w-540'>
        <div className='flex flex-col items-center justify-center w-6/10'>
          <div className='w-9/10 flex justify-around items-center gap-5'>
            <img src={logo} className='w-[calc(3rem+7vw)]' />
            <div className='flex flex-col justify-center'>
              <h2 className='text-[min(calc(1.5rem+1.1vw),4rem)] font-semibold ml-4 -mb-3 text-[#497345]'>Guess The Word</h2>
              <h1 className='text-[min(calc(1rem+4vw),6rem)] font-bold text-[#234120]'>W-GUESSER</h1>
            </div>
          </div>
          <div className='flex justify-around p-5 items-center w-9/10 py-8 gap-5'>
            <button className='px-[min(7rem,(calc(1rem+4vw)))] py-4 bg-[#325b2e] text-5xl min-w-60 min-h-18 font-bold text-[#d6fad3] rounded-4xl cursor-pointer hover:bg-[#294b26] duration-95'>Play</button>
            <button className='px-[min(7rem,(calc(0.5rem+1vw)))] py-4 bg-[#ACDDA8] text-5xl min-w-60 min-h-18 font-bold text-[#234120] rounded-4xl cursor-pointer hover:bg-[#9ac596] duration-95'>Word Of The Day</button>
          </div>
        </div>
        <div className='relative w-4/10 h-full flex flex-col items-end'>
          <div className='absolute top-20 h-screen w-fit flex flex-col gap-5 justify-start items-start py-10 px-15 bg-white rounded-t-2xl shadow-sm animate-slide-up'>
            <div className='flex items-center gap-3 w-fit h-fit'>
              <img src={logo} className='w-[calc(0.5rem+2vw)]' />
              <p className='text-3xl font-bold text-[#234120]'>W-GUESSER</p>
            </div>
            <Grid isBigTiles={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage