import { useContext } from "react";
import WordsContext from "../context/WordsContext";
import Context from "../context/Context";

export default function useWonOrLost(status) {
    const {setAllWords, setAllWordsState, setLetterIndex, setSubmitedRowNo, setTargetWord}= useContext(WordsContext);
    const {showToastMessege, setShowPopUp, isTimed} = useContext(Context);
    const handleGameOver = (status) => {
        setLetterIndex(0);
        setSubmitedRowNo(0);
        if (isTimed) {
            const wordle = randomWord();
            setTargetWord(wordle);
            status === 'won' ? showToastMessege('Right Guess ✅') : showToastMessege('Wrong Guesses ❌');
            setAllWords([
                '-----', '-----', '-----', '-----', '-----', '-----'
            ]);
            setAllWordsState(['', '', '', '', '', '']);
        } else {
            status === 'won' ? setShowPopUp('won') : setShowPopUp('lost');
        }
    }
    return handleGameOver;
}