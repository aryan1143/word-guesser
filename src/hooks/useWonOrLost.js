import { useContext } from "react";
import WordsContext from "../context/WordsContext";
import Context from "../context/Context";
import { randomWord } from "../components/utils/wordUtil";

export default function useWonOrLost() {
    const {setAllWords, setAllWordsState, setLetterIndex, setSubmitedRowNo, setTargetWord}= useContext(WordsContext);
    const {showToastMessege, setShowPopUp, isTimed} = useContext(Context);
    const handleGameOver = (status) => {
        setLetterIndex(0);
        setSubmitedRowNo(0);
        if (isTimed) {
            const wordle = randomWord();
            setTargetWord(wordle);
            status === 'won' ? showToastMessege('Right Guess ✅') : showToastMessege('Wrong Guess ❌');
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