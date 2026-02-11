import { useState } from 'react'
import WordsContext from './wordsContext'

const WordsContextProvider = ({ children }) => {
  const [letter, setLetter] = useState(null);
  const [targetWord, setTargetWord] = useState('GUESS');


  const value = {
    letter,
    setLetter,
    targetWord,
    setTargetWord
  }

  return (
    <WordsContext.Provider value={value}>
      {children}
    </WordsContext.Provider>
  )
}

export default WordsContextProvider