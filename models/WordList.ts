import {CardInput} from "./WordInputProps";
import {nanoid} from "nanoid";

export const defaultState: CardInput = {
    id: nanoid(),
    phonetic: '',
    phrase: '',
    translation: '',
    word: ''
};