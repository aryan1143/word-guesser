import { useContext, useEffect, useState } from "react";
import WordsContext from "../context/WordsContext";
import Context from "../context/Context"; 

function useTilesStateHandle(allWords, isSample = false) {
  const {setShowPopUp} = useContext(Context);
  const { targetWord, submitedRowNo, setSubmitedRowNo, setLetterIndex, letter, allWordsState, setAllWordsState } = useContext(WordsContext);

  const target = isSample ? 'GUESS' : targetWord;

  useEffect(() => {
    const WordsState = allWords.map((word, i) => {
      if (word === targetWord && submitedRowNo === (i+1)) {
        setShowPopUp('won');
        setLetterIndex(0);
        setSubmitedRowNo(0);
      }
      if((!isSample) && submitedRowNo <= i) return '';
      const state = word.split('').map((letter, index) => {
        if (letter === '-') return '';
        if (target.includes(letter)) {
          if (letter === target[index]) {
            return 'R';
          }
          return 'F';
        }
        return 'N'
      }).join('');
      return state;
    })
    setAllWordsState(WordsState);
  }, [submitedRowNo, letter])
  

  return allWordsState;
}

export default useTilesStateHandle;