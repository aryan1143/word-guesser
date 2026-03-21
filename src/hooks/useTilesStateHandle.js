import { useContext, useEffect } from "react";
import WordsContext from "../context/WordsContext";
import useWonOrLost from "./useWonOrLost";
import Context from "../context/Context";

function useTilesStateHandle(allWords, isSample = false) {
  const { targetWord, submitedRowNo, letter, allWordsState, setAllWordsState, guessedList } = useContext(WordsContext);
  const {hardMode} = useContext(Context);

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
            if (hardMode && !isSample) {
              guessedList[index] = true;
            }
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