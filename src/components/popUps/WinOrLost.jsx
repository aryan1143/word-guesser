import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import WordsContext from '../../context/WordsContext';
import Context from '../../context/Context';
import WonLogo from '/won.jpg';
import LostLogo from '/lost.jpg';
import TimeUp from '/time-up.jpg';
import { useScoreContext } from '../../context/ScoreContext';

const WinOrLost = ({ status = 'lost' }) => {

    const { setTargetWord, targetWord, submitedRowNo, setSubmitedRowNo, setLetterIndex, resetWordleData, randomWord } = useContext(WordsContext);
    const { setShowPopUp, inDailyWordle, isChallengePopUp, setIsChallengePopUp, easyMode } = useContext(Context);

    const { currentScore } = useScoreContext();

    function handleOnClick() {
        setShowPopUp(null);
        resetWordleData();
        setShowPopUp('GetDuration');
        const word = randomWord(easyMode);
        setTargetWord(word);
        console.log(word)
    }

    function handleHomeClick() {
        setShowPopUp(null);
        setIsChallengePopUp(false);
        setLetterIndex(0);
        setSubmitedRowNo(0);
    }

    return (
        <div className={`absolute top-0 left-0 z-30 h-screen w-screen bg-[#62626225] dark:bg-[rgba(0,0,0,0.4)] backdrop-blur-xs`}>
            <div className={`flex flex-col items-center pop-up w-9/10 h-45/100 -translate-y-10 md:translate-y-0 md:h-7/10 md:w-30/100`}>
                <div className="w-full flex justify-between h-fit text-2xl items-center">
                    <p className='bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] [text-shadow:1px_2px_0_#acdda8] dark:[text-shadow:1px_2px_0_#1a1f24] bg-[#d7ead5] dark:bg-[#1d2532] border dark:border-[rgba(255,255,255,0.1)] border-b-0 rounded-b-none rounded-xl px-2 p-1 border-[#0000004d] text-[#234120] dark:text-[#e0e8f0]'>
                        Game Status
                    </p>
                </div>
                <div className='overflow-hidden p-3 shadow-[0_4px_0_0_#234120] dark:shadow-[0_4px_0_0_#000000] flex flex-col h-full w-full items-center border dark:border-[rgba(255,255,255,0.1)] rounded-t-none border-[#0000004d] bg-[#d7ead5] dark:bg-[#1d2532]  rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[30px_30px]'>
                    <div className='w-full mb-auto'>
                        {status === 'won' ?
                            <img className='w-full' src={WonLogo} alt="Won Logo" />
                            :
                            status === 'timeUp' ?
                                <img className='w-full' src={TimeUp} alt="Time Up Logo" />
                                :
                                <img className='w-full' src={LostLogo} alt="Lost Logo" />
                        }

                    </div>
                    <div className='w-full h-3/10 flex flex-col gap-2 text-2xl justify-center items-center text-[#234120] dark:text-[#e0e8f0]'>
                        <p className='w-full h-fit flex justify-center items-center'>
                            {status === 'won' ? `GUESSED WORDLE: ${targetWord}` : `TARGET WORDLE: ${targetWord}`}
                        </p>
                        <div className='flex justify-center gap-3'>
                            <p>Tries: {submitedRowNo || 0}</p>
                            <p>Score: {currentScore || 0}</p>
                        </div>
                    </div>
                    <div className='w-full flex justify-around mt-auto gap-2 text-2xl'>
                        <Link onClick={handleHomeClick} to={'/'} className='flex justify-center items-center flex-1 md:w-[6vw] h-[calc(1rem+3vh)] md:h-[calc(1.2rem+3vh)] text-[#234120] bg-[#acdda8] cursor-pointer shadow-[0_2px_0_0_#234120]'>
                            Home
                        </Link>

                        {!inDailyWordle && !isChallengePopUp && (
                            <button onClick={handleOnClick} className='flex-1 md:w-[6vw] h-[calc(1rem+3vh)] md:h-[calc(1.2rem+3vh)] bg-[#234120] text-[#acdda8] cursor-pointer shadow-[0_3px_0_0_#acdda8]'>
                                Play Again
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WinOrLost;