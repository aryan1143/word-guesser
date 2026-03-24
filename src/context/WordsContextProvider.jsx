import { useContext, useEffect, useState } from 'react'
import WordsContext from './WordsContext'
import Context from './Context';
import { easy_target_wordles } from "../easyWordles";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dictionary, setDictionary] = useState([]);
  const [targetWordData, setTargetWordData] = useState({});

  const [remainingHints, setRemainingHints] = useState(2);

  const { setShowPopUp } = useContext(Context);

  function randomWord(isEasyMode = false) {

    let poolOfWords = dictionary;

    if (isEasyMode) {

      poolOfWords = dictionary.filter(item =>
        easy_target_wordles.includes(item.word)
      );
    }

    const randomIndex = Math.floor(Math.random() * poolOfWords.length);
    console.log(poolOfWords[randomIndex]);

    return poolOfWords[randomIndex]?.word.toUpperCase();
  }


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
    setShowPopUp('HintBox');
    setRemainingHints(prev => (prev - 1));
  }


  useEffect(() => {

    const loadWordleInfo = async () => {
      try {
        setLoading(true);

        const response = await fetch('/target_wordle_info.json');

        if (!response.ok) {
          throw new Error('Failed to load dictionary data');
        }

        const data = await response.json();

        setDictionary(data);
        const randomIndex = Math.floor(Math.random() * data.length);
        setTargetWordData(data[randomIndex]);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadWordleInfo();
  }, [])


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
    showHint,
    randomWord
  }

  return (
    <WordsContext.Provider value={value}>
      {children}
    </WordsContext.Provider>
  )
}

export default WordsContextProvider;