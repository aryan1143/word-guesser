import { useEffect, useState } from 'react'
import WordsContext from './WordsContext'
import { useLocation } from 'react-router-dom';

const WordsContextProvider = ({ children }) => {
  const [letter, setLetter] = useState(null);
  const [targetWord, setTargetWord] = useState('FIGHT');
  const [allWords, setAllWords] = useState([
    '-----', '-----', '-----', '-----', '-----', '-----'
  ]);
  const [submitedRowNo, setSubmitedRowNo] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isBubbling, setIsBubbling] = useState(false);
  const location = useLocation();
  const locationPath = location.pathname;

  useEffect(() => {
    setSubmitedRowNo(0);
  }, [locationPath])

  const value = {
    letter,
    setLetter,
    targetWord,
    setTargetWord,
    allWords,
    setAllWords,
    submitedRowNo,
    setSubmitedRowNo,
    letterIndex,
    setLetterIndex,
    isShaking,
    setIsShaking,
    isBubbling,
    setIsBubbling
  }

  return (
    <WordsContext.Provider value={value}>
      {children}
    </WordsContext.Provider>
  )
}

export default WordsContextProvider;