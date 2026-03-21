import { useContext, useEffect, useState } from "react";
import WordsContext from "../context/WordsContext";
import compareWord from "../components/utils/compareWord";
import Context from "../context/Context";
import useWonOrLost from "./useWonOrLost";

function useHandleLetters() {
    const { letter, setLetter, allWords, targetWord, setAllWords, setSubmitedRowNo, submitedRowNo, letterIndex, setLetterIndex, setIsShaking, setIsBubbling, guessedList } = useContext(WordsContext);
    const { showPopUp, hardMode, showToastMessege } = useContext(Context);

    const handleGameOver = useWonOrLost();

    useEffect(() => {
        if (!letter) return;
        if (showPopUp) {
            return;
        }

        if (letter === 'ENTER') {
            if (hardMode) {
                let isWrong = false;
                let wrongGuessed = '';
                const currentWord = allWords[submitedRowNo];
                guessedList.forEach((isGuessed, index) => {
                    if (!isGuessed) return;
                    if (currentWord[index] === targetWord[index]) return;
                    isWrong = true;
                    wrongGuessed += wrongGuessed.length > 0 ? `, ${targetWord[index]}` : targetWord[index];
                });
                if (isWrong) {
                    showToastMessege("Guess must contain " + wrongGuessed);
                    setIsShaking(true);
                    setTimeout(() => {
                        setIsShaking(false);
                    }, 300);
                    return;
                }
            }
            if (letterIndex === 5 && submitedRowNo === 5 && (!allWords.includes(targetWord))) {
                handleGameOver('lost');
                return;
            }
            if (letterIndex === 5 && submitedRowNo < 6) {
                if (compareWord(allWords[submitedRowNo])) {
                    setSubmitedRowNo((prev) => prev + 1);
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