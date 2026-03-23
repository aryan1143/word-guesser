import { useContext, useEffect } from 'react'
import Grid from '../components/Grid'
import Keyboard from '../components/Keyboard'
import useHandleLetters from '../hooks/useHandleLetters'
import WordsContext from '../context/WordsContext'
import Context from '../context/Context'
import { randomWord } from '../components/utils/wordUtil'
import { FaLightbulb } from "react-icons/fa";

const GamePage = () => {

    const { allWords, setTargetWord, targetWord, remainingHints, showHint } = useContext(WordsContext);
    const { easyMode, hintBtn } = useContext(Context);
    useHandleLetters();

    useEffect(() => {
        if (targetWord) return;

        const wordle = randomWord(easyMode);
        setTargetWord(wordle);
    }, [targetWord])


    return (
        <div className='relative mt-8 md:mt-0 flex flex-col items-center gap-5 md:gap-2 h-8/10 md:flex-1'>
            <Grid isBigTiles={false} allWords={allWords} />
            {hintBtn &&
                <button onClick={showHint} disabled={remainingHints <= 0} className={`relative block md:absolute md:bottom-20 right-2 p-3 text-3xl rounded-[50%] mt-auto -mb-15 ml-auto mr-5 disabled:opacity-50 text-[#234120] dark:text-[#e0e8f0] bg-[#acdda8] dark:bg-[#4a7c52] outline outline-[#00000057] dark:outline-[#ffffff7c]`}>
                    <FaLightbulb />
                    <span className={`absolute flex justify-center items-center top-0 right-0 h-3/10 aspect-square rounded-[50%] bg-[#acdda8] dark:bg-[#4a7c52] outline outline-[#00000057] dark:outline-[#ffffff7c] text-sm`}>{remainingHints || 0}</span>
                </button>
            }

            <Keyboard allWords={allWords} />
        </div>
    )
}

export default GamePage