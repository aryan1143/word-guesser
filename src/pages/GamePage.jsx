import React from 'react'
import Grid from '../components/Grid'
import Keyboard from '../components/Keyboard'

const GamePage = () => {
    const allWords = [
        'FELLO',
        'FIREE',
        '-----',
        '-----',
        '-----',
        '-----'
    ]

    return (
        <div className='mt-8 md:mt-0 flex flex-col items-center gap-5 md:gap-2 h-8/10 md:flex-1'>
            <Grid isBigTiles={false} allWords={allWords} targetWord={'HELLO'}/>
            <Keyboard />
        </div>
    )
}

export default GamePage