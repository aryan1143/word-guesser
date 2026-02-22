import {target_wordles, valid_wordles} from '../../constants'

export default function compareWord(word) {
    const all_wordles = [...target_wordles, ...valid_wordles];
    return all_wordles.includes(word.toLowerCase());
}