import { target_wordles } from "../../constants";

export default function getDailyWordle() {
    const words = target_wordles;

    const startDate = new Date("2024-01-01");
    const today = new Date();

    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const wordle = words[diffDays % words.length].toUpperCase();
    return wordle;
}