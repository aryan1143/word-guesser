import { target_wordles } from "../../constants";
import { easy_target_wordles } from "../../easyWordles";

export function randomWord(isEasy = false) {
    let word = '';
    if (isEasy) {
        const randomIndex = Math.floor(Math.random() * 499);
        word = easy_target_wordles[randomIndex].toUpperCase();
    } else {
        const randomIndex = Math.floor(Math.random() * 2315);
        word = target_wordles[randomIndex].toUpperCase();
    }
    return word;
}