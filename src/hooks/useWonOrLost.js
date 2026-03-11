import { useContext, useEffect } from "react";
import WordsContext from "../context/WordsContext";
import Context from "../context/Context";
import { randomWord } from "../components/utils/wordUtil";
import { useScoreContext } from "../context/ScoreContext";
import useHandleDidDailyWordle from "./useHandleDidDailyWordle";
import useHandleStreak from "./useHandleStreak";

export default function useWonOrLost() {
    const { setAllWords, setAllWordsState, setTargetWord, submitedRowNo, setLetterIndex, setSubmitedRowNo } = useContext(WordsContext);
    const { showToastMessege, setShowPopUp, isTimed, inDailyWordle } = useContext(Context);
    const { setCurrentScore } = useScoreContext();

    const { doDailyWordle } = useHandleDidDailyWordle();

    const { updateStreak } = useHandleStreak();

    useEffect(() => {
        updateStreak();
    }, []);


    const handleGameOver = (status) => {
        if (isTimed) {
            setLetterIndex(0);
            setSubmitedRowNo(0);
            const wordle = randomWord();
            setTargetWord(wordle);
            status === 'won' && setCurrentScore(prev => (prev + ((7 - submitedRowNo) * 100)));
            status === 'won' ? showToastMessege('Right Guess ✅') : showToastMessege('Wrong Guess ❌');
            setAllWords([
                '-----', '-----', '-----', '-----', '-----', '-----'
            ]);
            setAllWordsState(['', '', '', '', '', '']);
        } else {
            status === 'won' ? setCurrentScore((7 - submitedRowNo) * 100) : setCurrentScore(0);
            status === 'won' ? setShowPopUp('won') : setShowPopUp('lost');
            inDailyWordle && doDailyWordle();
        }
    }
    return handleGameOver;
}