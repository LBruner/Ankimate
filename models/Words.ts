import {cardInput} from "./WordInputProps";
import {languageConfig} from "./Card";

export interface WordsData{
    language: languageConfig,
    words: cardInput[],
    deck: string
}
