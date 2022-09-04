import {CardInput} from "./WordInputProps";
import {languageConfig} from "./Card";

export interface WordsData{
    language: languageConfig,
    words: CardInput[],
    deck: string
}
