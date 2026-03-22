import React, { useContext, useEffect } from 'react'
import Grid from '../components/Grid'
import Keyboard from '../components/Keyboard'
import useHandleLetters from '../hooks/useHandleLetters'
import WordsContext from '../context/WordsContext'
import Context from '../context/Context'
import { randomWord } from '../components/utils/wordUtil'

const GamePage = () => {

    const { allWords, setTargetWord, targetWord } = useContext(WordsContext);
    const { easyMode } = useContext(Context);
    useHandleLetters();

    useEffect(() => {
      if (targetWord) return;

      const wordle = randomWord(easyMode);
      setTargetWord(wordle);
    }, [targetWord])
    

    return (
        <div className='mt-8 md:mt-0 flex flex-col items-center gap-5 md:gap-2 h-8/10 md:flex-1'>
            <Grid isBigTiles={false} allWords={allWords} />
            <Keyboard allWords={allWords} />
        </div>
    )
}

export default GamePage