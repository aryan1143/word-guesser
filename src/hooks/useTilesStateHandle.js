import { useContext, useEffect, useState } from "react";
import WordsContext from "../context/WordsContext";
import Context from "../context/Context";
import { randomWord } from "../components/utils/wordUtil";
import useWonOrLost from "./useWonOrLost";

function useTilesStateHandle(allWords, isSample = false) {
  const { setShowPopUp, isTimed, showToastMessege } = useContext(Context);
  const { targetWord, setTargetWord, setAllWords, submitedRowNo, setSubmitedRowNo, setLetterIndex, letter, allWordsState, setAllWordsState } = useContext(WordsContext);

  const handleGameOver = useWonOrLost();

  const target = isSample ? 'GUESS' : targetWord;

  useEffect(() => {
    const WordsState = allWords.map((word, i) => {
      if (word === targetWord && submitedRowNo === (i + 1)) {
        handleGameOver('won');
      }
      if ((!isSample) && submitedRowNo <= i) return '';
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