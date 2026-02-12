import { useContext, useEffect, useState } from "react";
import WordsContext from "../context/wordsContext";

function useHandleLetters() {
    const { letter, setLetter, setSubmitedRowNo, submitedRowNo } = useContext(WordsContext);
    
    const [allWords, setAllWords] = useState([
        '-----', '-----', '-----', '-----', '-----', '-----'
    ]);

    const [letterIndex, setLetterIndex] = useState(0);

    useEffect(() => {
        if (!letter) return;

        if (letter === 'ENTER') {
            if (letterIndex === 5 && submitedRowNo < 6) {
                setSubmitedRowNo((prev)=> prev + 1);
                setLetterIndex(0); 
            }
            return;
        }

        if (letter === 'BACKSPACE') {
            if (letterIndex > 0) {
                const newGrid = [...allWords];
                const currentWordArr = newGrid[submitedRowNo].split('');
                currentWordArr[letterIndex - 1] = '-';
                newGrid[submitedRowNo] = currentWordArr.join('');
                
                setAllWords(newGrid);
                setLetterIndex((prev) => prev - 1);
                setLetter(null);
            }
            return;
        }
        if (letterIndex < 5 && submitedRowNo < 6) {
            const newGrid = [...allWords];
            const currentWordArr = newGrid[submitedRowNo].split('');
            currentWordArr[letterIndex] = letter;
            newGrid[submitedRowNo] = currentWordArr.join('');

            setAllWords(newGrid);
            setLetterIndex((prev) => prev + 1);
        }
        setLetter(null);
    }, [letter]);

    return allWords;
}

export default useHandleLetters;