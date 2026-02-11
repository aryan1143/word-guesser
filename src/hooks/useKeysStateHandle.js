import { useContext, useEffect, useState } from "react";
import WordsContext from "../context/wordsContext";

function useKeysStateHandle(keysRow, allWords) {
    const [keysStateRow, setKeysStateRow] = useState([[], [], []]);
    const { letter, targetWord } = useContext(WordsContext);

    useEffect(() => {
        const keysRowStatus = keysRow.map((keys) => {
            return keys.map((key) => {
                let status = '';
                allWords.forEach(word => {
                    if (word === '-----') return;
                    if (!word.includes(key)) return;
                    if (!targetWord.includes(key)) {
                        if (status === '') {
                            status = 'N';
                        }
                        return; 
                    }
                    let isGreenInThisWord = false;
                    [...word].forEach((l, i) => {
                        if (l === key && targetWord[i] === key) {
                            isGreenInThisWord = true;
                        }
                    });

                    if (isGreenInThisWord) {
                        status = 'R';
                    } else if (status !== 'R') {
                        status = 'F'; 
                    }
                });
                
                return status;
            });
        });
        
        setKeysStateRow(keysRowStatus);
    }, [letter]); 

    return keysStateRow;
}

export default useKeysStateHandle;