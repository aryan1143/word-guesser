import { useContext, useEffect, useState } from "react";
import WordsContext from "../context/wordsContext";

function useTilesStateHandle(allWords, isSample = false) {
  const [allWordsState, setAllWordsState] = useState(['','','','','','']);
  const { targetWord, submitedRowNo, letter } = useContext(WordsContext);

  const target = isSample ? 'GUESS' : targetWord;

  useEffect(() => {
    const WordsState = allWords.map((word, i) => {
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