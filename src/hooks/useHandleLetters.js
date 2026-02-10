import { useContext, useEffect, useState } from "react";
import WordsContext from "../context/wordsContext";

function useHandleLetters() {
    const { letter, setLetter } = useContext(WordsContext);
    
    const [allWords, setAllWords] = useState([
        '-----', '-----', '-----', '-----', '-----', '-----'
    ]);

    const [wordIndex, setWordIndex] = useState(0);
    const [letterIndex, setLetterIndex] = useState(0);

    useEffect(() => {
        if (!letter) return;

        if (letter === 'ENTER') {
            if (letterIndex === 5 && wordIndex < 6) {
                setWordIndex((prev) => prev + 1);
                setLetterIndex(0); 
            }
            return;
        }

        if (letter === 'BACKSPACE') {
            if (letterIndex > 0) {
                const newGrid = [...allWords];
                const currentWordArr = newGrid[wordIndex].split('');
                currentWordArr[letterIndex - 1] = '-';
                newGrid[wordIndex] = currentWordArr.join('');
                
                setAllWords(newGrid);
                setLetterIndex((prev) => prev - 1);
                setLetter(null);
            }
            return;
        }
        if (letterIndex < 5 && wordIndex < 6) {
            const newGrid = [...allWords];
            const currentWordArr = newGrid[wordIndex].split('');
            currentWordArr[letterIndex] = letter;
            newGrid[wordIndex] = currentWordArr.join('');

            setAllWords(newGrid);
            setLetterIndex((prev) => prev + 1);
        }
        setLetter(null);
    }, [letter]);

    return allWords;
}

export default useHandleLetters;