import React, { useContext } from 'react'
import Context from '../../context/Context'
import WordsContext from '../../context/WordsContext';

const HintBox = () => {
    const { setShowPopUp } = useContext(Context);
    const { targetWordData, remainingHints } = useContext(WordsContext);
    const hint =
        remainingHints > 0
            ? targetWordData?.definition
            : (
                <>
                    Wordle stats with the letter{" "}
                    <span className="underline">
                        {targetWordData?.word[0]?.toUpperCase()}
                    </span>
                </>
            );

    return (
        <div className={`text-[#234120] dark:text-[#e0e8f0] fixed top-0 left-0 z-30 h-screen w-screen bg-[#62626225] dark:bg-[rgba(0,0,0,0.4)] backdrop-blur-xs`}>
            <div className={`flex flex-col items-center pop-up w-8/10 -translate-y-10 lg:translate-y-0 h-fit lg:w-23/100`}>
                <div className='overflow-hidden p-3 shadow-[0_4px_0_0_#234120] dark:shadow-[0_4px_0_0_#000000] flex flex-col h-full w-full items-center border dark:border-[rgba(255,255,255,0.1)] border-[#0000004d] bg-[#d7ead5] dark:bg-[#1d2532] rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[30px_30px]'>
                    <div className='flex flex-row gap-2 h-fit w-full justify-start items-center'>
                        <img src="/logo.svg" className='size-[calc(1.3rem+0.2vw)]' />
                        <div className='h-fit'>
                            <p className='text-3xl lg:text-4xl text-[#234120] dark:text-[#e0e8f0]'>W-GUESSER</p>
                        </div>
                    </div>
                    <div className='flex min-h-[10vh] lg:min-h-[12vh] items-center justify-center'>
                        <p className='text-xl lg:text-2xl text-[#234120] dark:text-[#b0bcc9]'><span className='underline'>Hint</span>: {hint}</p>
                    </div>
                    <div className='h-fit w-full flex justify-end gap-2 mt-2'>
                        <button onClick={() => setShowPopUp(null)} className='flex-1 h-[calc(1rem+2.5vh)] bg-[#234120] dark:bg-[#1a1f24] text-[#acdda8] dark:text-[#e0e8f0] cursor-pointer shadow-[0_3px_0_0_#acdda8] dark:shadow-[0_3px_0_0_#4a7c52]'>Ok</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HintBox