import { useContext } from "react";
import WordsContext from "../context/wordsContext";

function useWordsStateHandler(allWords) {

  const { targetWord } = useContext(WordsContext);

  const allWordsState = allWords.map((word) => {
    const state = word.split('').map((letter, index) => {
      if (letter === '-') return '';
      if (targetWord.includes(letter)) {
        if (letter === targetWord[index]) {
          return 'R';
        }
        return 'F';
      }
      return 'N'
    }).join('');
    return state;
  })

  return allWordsState;
}

export default useWordsStateHandler;