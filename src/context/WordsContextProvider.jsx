import { useContext, useEffect, useState } from 'react'
import WordsContext from './WordsContext'
import Context from './Context';
import { easy_target_wordles } from "../easyWordles";

const WordsContextProvider = ({ children }) => {


  const [letter, setLetter] = useState(null);
  const [targetWord, setTargetWord] = useState('GUESS');
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

  const { setShowPopUp, showToastMessege } = useContext(Context);

  function randomWord(isEasyMode = false) {

    let poolOfWords = dictionary;

    if (isEasyMode) {

      poolOfWords = dictionary.filter(item =>
        easy_target_wordles.includes(item.word)
      );
    }

    const randomIndex = Math.floor(Math.random() * poolOfWords.length);
    
    setTargetWordData(poolOfWords?.[randomIndex]);

    return poolOfWords?.[randomIndex]?.word.toUpperCase();
  }

  function getDailyWordle() {
      const poolOfWords = dictionary;
  
      const startDate = new Date("2024-01-01");
      const today = new Date();
  
      const diffTime = today - startDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const wordle = poolOfWords[diffDays % poolOfWords.length]?.word?.toUpperCase();
      setTargetWordData(poolOfWords?.[diffDays % poolOfWords.length]);
      return wordle;
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
      showToastMessege('You have used all your hints.')
      return;
    } else if(remainingHints === 1) {

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
        setTargetWord(data[randomIndex].word.toUpperCase());

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
    targetWordData,
    remainingHints,
    resetWordleData,
    showHint,
    randomWord,
    getDailyWordle,
  }

  return (
    <WordsContext.Provider value={value}>
      {children}
    </WordsContext.Provider>
  )
}

export default WordsContextProvider;