import {CardInput} from "./WordInput";
import {languageConfig} from "./Card";

export interface WordsData{
    language: languageConfig,
    words: CardInput[],
    deck: string}
