import { useState } from 'react'
import Tile from './Tile'
import useTilesStateHandle from '../hooks/useTilesStateHandle';

const Grid = ({ isBigTiles = false, allWords, isSample }) => {

  const allWordsState = useTilesStateHandle(allWords, isSample);

  return (
    <div className={`grid w-fit grid-cols-5 grid-rows-6 ${isBigTiles ? 'gap-3' : 'gap-2'}`}>
      {allWords.map((word, wordIndex) => {
        return word.split('').map((letter, letterIndex) => {
          if (letter === '-') letter = '';
          return <Tile key={'' + wordIndex + letterIndex} letter={letter} isBigTiles={isBigTiles} isGuessed={allWordsState[wordIndex][letterIndex] === 'F' || allWordsState[wordIndex][letterIndex] === 'R'} isGuessedWithPos={allWordsState[wordIndex][letterIndex] === 'R'} isWrongGuess={allWordsState[wordIndex][letterIndex] === 'N'} />
        })
      })}
    </div>
  )
}

export default Grid