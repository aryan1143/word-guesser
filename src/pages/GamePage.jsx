import React, { useContext, useEffect } from 'react'
import Grid from '../components/Grid'
import Keyboard from '../components/Keyboard'
import WordsContext from '../context/wordsContext'
import useHandleLetters from '../hooks/useHandleLetters'

const GamePage = () => {
    const {targetWord} = useContext(WordsContext);
    const allWords = useHandleLetters();
    return (
        <div className='mt-8 md:mt-0 flex flex-col items-center gap-5 md:gap-2 h-8/10 md:flex-1'>
            <Grid isBigTiles={false} allWords={allWords} />
            <Keyboard allWords={allWords}/>
        </div>
    )
}

export default GamePage