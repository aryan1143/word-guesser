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

  const [remainingHints, setRemainingHints] = useState(2);

  function resetWordleData() {
    setAllWords([
      '-----', '-----', '-----', '-----', '-----', '-----'
    ]);
    setAllWordsState(['', '', '', '', '', '']);
    setGuessedList([false, false, false, false, false]);
    setLetterIndex(0);
    setSubmitedRowNo(0);
    setRemainingHints(2);
  }

  function showHint() {
    if (remainingHints <= 0) {
      return;
    }
    console.log('show hint')
    setRemainingHints(prev => (prev - 1));
  }

  const value = {
    letter, setLetter,
    targetWord, setTargetWord,
    allWords, setAllWords,
    allWordsState, setAllWordsState,
    submitedRowNo, setSubmitedRowNo,
    letterIndex, setLetterIndex,
    isShaking, setIsShaking,
    isBubbling, setIsBubbling,
    guessedList, setGuessedList,
    remainingHints, setRemainingHints,
    resetWordleData,
    showHint
  }

  return (
    <WordsContext.Provider value={value}>
      {children}
    </WordsContext.Provider>
  )
}

export default WordsContextProvider;