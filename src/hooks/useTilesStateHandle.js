import { useContext, useEffect, useState } from "react";
import WordsContext from "../context/WordsContext";
import Context from "../context/Context";
import { randomWord } from "../components/utils/wordUtil";

function useTilesStateHandle(allWords, isSample = false) {
  const { setShowPopUp, isTimed, showToastMessege } = useContext(Context);
  const { targetWord, setTargetWord, setAllWords, submitedRowNo, setSubmitedRowNo, setLetterIndex, letter, allWordsState, setAllWordsState } = useContext(WordsContext);

  const target = isSample ? 'GUESS' : targetWord;

  useEffect(() => {
    const WordsState = allWords.map((word, i) => {
      if (word === targetWord && submitedRowNo === (i + 1)) {
        setLetterIndex(0);
        setSubmitedRowNo(0);
        if (isTimed) {
          const wordle = randomWord();
          setTargetWord(wordle);
          showToastMessege('Right Guess ✅');
          setAllWords([
            '-----', '-----', '-----', '-----', '-----', '-----'
          ]);
          setAllWordsState(['', '', '', '', '', '']);
        } else {
          setShowPopUp('won');
        }
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