import { useState } from 'react'
import WordsContext from './wordsContext'

const WordsContextProvider = ({ children }) => {
  const [letter, setLetter] = useState(null);
  const [targetWord, setTargetWord] = useState('GUESS');
  const [submitedRowNo, setSubmitedRowNo] = useState(-1);


  const value = {
    letter,
    setLetter,
    targetWord,
    setTargetWord,
    submitedRowNo,
    setSubmitedRowNo
  }

  return (
    <WordsContext.Provider value={value}>
      {children}
    </WordsContext.Provider>
  )
}

export default WordsContextProvider