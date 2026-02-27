import { target_wordles, valid_wordles } from "../../constants";

const allWordles = [...target_wordles, ...valid_wordles];
const wordToIndex = new Map(
    allWordles.map((word, i) => [word, i])
);

export function getWordIndex(word) {
    if (typeof word !== "string") return -1;
    return wordToIndex.get(word.toLowerCase());
}

export function getWordByIndex(index) {
    if (typeof index !== "number" || index < 0 || index >= allWordles.length) {
        return null;
    }

    return allWordles[index].toUpperCase();
}