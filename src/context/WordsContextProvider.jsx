import { useEffect, useState } from 'react'
import WordsContext from './wordsContext'
import {useLocation } from 'react-router-dom';

const WordsContextProvider = ({ children }) => {
  const [letter, setLetter] = useState(null);
  const [targetWord, setTargetWord] = useState('FIGHT');
  const [submitedRowNo, setSubmitedRowNo] = useState(0);

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
    submitedRowNo,
    setSubmitedRowNo
  }

  return (
    <WordsContext.Provider value={value}>
      {children}
    </WordsContext.Provider>
  )
}

export default WordsContextProvider;