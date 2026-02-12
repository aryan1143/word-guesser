import { useState } from 'react'
import Tile from './Tile'
import useTilesStateHandle from '../hooks/useTilesStateHandle';

const Grid = ({ isBigTiles = false, allWords }) => {

  //Function to return the state of each tile i.e.(R: Right letter on right position, F: Right letter but wrong position, N: Letter is not present in the word)
  const allWordsState = useTilesStateHandle(allWords);

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