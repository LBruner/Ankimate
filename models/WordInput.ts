import {Dispatch, SetStateAction} from "react";
import {languageConfig} from "./Card";
import {Language} from "../src/WordInput/WordInputForm";

export interface CardInput {
    id: string,
    word: string,
    phonetic: string,
    phrase: string,
    translation: string,
    language: Language
}

export interface WordInputListProps {
    wordList: CardInput[];
    setWordList: Dispatch<SetStateAction<CardInput[]>>
    languageConfig:{
        curLanguage: Language,
        setLanguage: Dispatch<SetStateAction<Language>>
    } 
}

export interface WordInput {
    index: number,
    id: string, 
    
    wordFunctions: {
        addInput: () => void;
        onUpdateWord: (word: CardInput, id: number) => void;
        onDeleteWord: (id: number) => void;
        changeCardLanguage: (id: string, language: Language) => void;
    }
    languageConfig:{
        curLanguage: Language,
        setLanguage: Dispatch<SetStateAction<Language>>
    }
    isEnglishSet: boolean,
    isFirstElement: boolean,
    isLastElement: boolean,
}

export interface DeckProps{
    deck: string,
    setDeck: (selectedDeck: string) => void,
}

export interface languagePickerProps{
    setDeck: (selectedDeck: string) => void,
    language: languageConfig,
    setLanguage: (newLang: languageConfig) => void
}

export type availableOutputs = 'en' | 'pt'

export type availableInput = 'en' | 'fr'
