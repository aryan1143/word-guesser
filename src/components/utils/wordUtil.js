import { target_wordles } from "../../constants";

export function randomWord() {
    const randomIndex = Math.floor(Math.random() * 2315);
    const word = target_wordles[randomIndex].toUpperCase();
    return word;
}