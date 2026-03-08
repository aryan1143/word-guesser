import { useContext } from "react";
import WordsContext from "../context/WordsContext";
import Context from "../context/Context";
import { randomWord } from "../components/utils/wordUtil";
import { useScoreContext } from "../context/ScoreContext";

export default function useWonOrLost() {
    const { setAllWords, setAllWordsState, setTargetWord, submitedRowNo, setLetterIndex, setSubmitedRowNo } = useContext(WordsContext);
    const { showToastMessege, setShowPopUp, isTimed } = useContext(Context);
    const { setCurrentScore } = useScoreContext();
    const handleGameOver = (status) => {
        status === 'won' ? setCurrentScore((7 - submitedRowNo) * 100) : setCurrentScore(0);
        if (isTimed) {
            setLetterIndex(0);
            setSubmitedRowNo(0);
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