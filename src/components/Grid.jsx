import { useContext, useState } from 'react'
import Tile from './Tile'
import useTilesStateHandle from '../hooks/useTilesStateHandle';
import WordsContext from '../context/wordsContext';

const Grid = ({ isBigTiles = false, isSample = false, sampleWords}) => {
  
  const {submitedRowNo, isShaking, letterIndex, isBubbling, allWords} = useContext(WordsContext);
  const words = isSample ? sampleWords : allWords;
  const allWordsState = useTilesStateHandle(words, isSample);

  return (
    <div className={`grid w-fit grid-cols-5 grid-rows-6 ${isBigTiles ? 'gap-3' : 'gap-2'}`}>
      {words.map((word, wordIndex) => {
        return word.split('').map((letter, letterI) => {
          if (letter === '-') letter = '';
          return <Tile style={(wordIndex === submitedRowNo && isShaking && 'shake') || (isBubbling && wordIndex === submitedRowNo && letterIndex === (letterI + 1) && 'bubble')} key={'' + wordIndex + letterI} letter={letter} isBigTiles={isBigTiles} isGuessed={allWordsState[wordIndex][letterI] === 'F' || allWordsState[wordIndex][letterI] === 'R'} isGuessedWithPos={allWordsState[wordIndex][letterI] === 'R'} isWrongGuess={allWordsState[wordIndex][letterI] === 'N'} />
        })
      })}
    </div>
  )
}

export default Grid