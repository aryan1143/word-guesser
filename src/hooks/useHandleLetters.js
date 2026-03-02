import { useContext, useEffect, useState } from "react";
import WordsContext from "../context/WordsContext";
import compareWord from "../components/utils/compareWord";
import Context from "../context/Context";

function useHandleLetters() {
    const { letter, setLetter, allWords, targetWord, setAllWords, setSubmitedRowNo, submitedRowNo, letterIndex, setLetterIndex, setIsShaking, setIsBubbling } = useContext(WordsContext);
    const {showPopUp, setShowPopUp} = useContext(Context);

    useEffect(() => {
        if (!letter) return;
        if (showPopUp) {
            return;
        }

        if (letter === 'ENTER') {
            if (letterIndex === 5 && submitedRowNo === 5 && (!allWords.includes(targetWord))) {
                setShowPopUp('lost');
                setSubmitedRowNo(0);
                setLetterIndex(0);
                return;
            }
            if (letterIndex === 5 && submitedRowNo < 6) {
                if (compareWord(allWords[submitedRowNo])) {
                    setSubmitedRowNo((prev)=> prev + 1);
                    setLetterIndex(0); 
                } else {
                    setIsShaking(true);
                    setTimeout(() => {
                        setIsShaking(false);
                    }, 300);
                }
            }
            setLetter(null);
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
            setIsBubbling(true);
            setTimeout(() => {
                setIsBubbling(false);
            }, 200);
        }
        setLetter(null);
    }, [letter]);

    return allWords;
}

export default useHandleLetters;