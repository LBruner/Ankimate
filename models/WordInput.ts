import {Dispatch, SetStateAction} from "react";
import {Language} from "./Words";

export interface WordInputFormProps {
    isAnkiConnected: boolean;
    language: {
        curLanguage: Language,
        setCurLanguage: Dispatch<SetStateAction<Language>>
    },
    wordState: {
        wordsList: CardInput[];
        setWordsList: Dispatch<SetStateAction<CardInput[]>>
    }
}

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