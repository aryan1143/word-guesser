import { useState } from 'react'
import Tile from './Tile'

const Grid = ({ isBigTiles = false }) => {
  const [targetWord, setTargetWord] = useState('GUESS');

  const allWords = [
    'GLUES',
    'GUEST',
    'GUESS',
    '-----',
    '-----',
    '-----'
  ]

  //Function to return the state of each tile i.e.(R: Right letter on right position, F: Right letter but wrong position, N: Letter is not present in the word)
  const allWordsState = allWords.map((word) => {
    if(word === '-----') return '';
    const state = word.split('').map((letter, index) => {
      if(targetWord.includes(letter)) {
        if(letter === targetWord[index]){
          return 'R';
        }
        return 'F';
      }
      return 'N'
    }).join('');
    return state;
  })

  return (
    <div className={`grid grid-cols-5 grid-rows-6 ${isBigTiles ? 'gap-3' : 'gap-2'}`}>
      {allWords.map((word, wordIndex)=>{
        return word.split('').map((letter, letterIndex)=>{
          if(letter === '-') letter = '';
          return <Tile key={''+wordIndex+letterIndex} letter={letter} isBigTiles={isBigTiles} isGuessed={allWordsState[wordIndex][letterIndex] === 'F' || allWordsState[wordIndex][letterIndex] === 'R'} isGuessedWithPos={allWordsState[wordIndex][letterIndex] === 'R'} isWrongGuess={allWordsState[wordIndex][letterIndex] === 'N'}/>
        })
      })}
    </div>
  )
}

export default Grid