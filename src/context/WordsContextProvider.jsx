import { useState } from 'react'
import WordsContext from './WordsContext'

const WordsContextProvider = ({ children }) => {
  const [letter, setLetter] = useState(null);
  const [targetWord, setTargetWord] = useState(null);
  const [allWords, setAllWords] = useState([
    '-----', '-----', '-----', '-----', '-----', '-----'
  ]);
  const [allWordsState, setAllWordsState] = useState(['', '', '', '', '', '']);
  const [guessedList, setGuessedList] = useState([false, false, false, false, false]);
  const [submitedRowNo, setSubmitedRowNo] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isBubbling, setIsBubbling] = useState(false);

  const value = {
    letter,
    setLetter,
    targetWord,
    setTargetWord,
    allWords,
    setAllWords,
    allWordsState,
    setAllWordsState,
    submitedRowNo,
    setSubmitedRowNo,
    letterIndex,
    setLetterIndex,
    isShaking,
    setIsShaking,
    isBubbling,
    setIsBubbling,
    guessedList,
    setGuessedList
  }

  return (
    <WordsContext.Provider value={value}>
      {children}
    </WordsContext.Provider>
  )
}

export default WordsContextProvider;