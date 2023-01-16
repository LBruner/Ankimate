import {CardInput} from "./WordInput";
import {Language} from "./Words";

export interface CardOutput extends CardInput{
    word: string,
    phonetic: string, 
    phrase: string,
    translation: string,
    language: Language,
    isExpression?: boolean,
    wordAudio?: string, 
    phraseAudio?: string
}