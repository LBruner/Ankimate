import {Dispatch, SetStateAction} from "react";
import {languageConfig} from "./Card";

export interface CardInput {
    id: string,
    word: string,
    phonetic: string,
    phrase: string,
    translation: string
}

export interface wordInputListProps {
    wordList: CardInput[];
    setWordList: Dispatch<SetStateAction<CardInput[]>>
}

export interface wordInput {
    index: number,
    id: string, 
    
    wordFunctions: {
        addInput: () => void;
        onUpdateWord: (word: CardInput, id: number) => void;
        onDeleteWord: (id: number) => void;
    }
    isFirstElement: boolean,
    isLastElement: boolean,
}

export interface WordInputConfigProps{
    deck: string,
    setDeck: (selectedDeck: string) => void,
    language: languageConfig, 
    setLanguage: (newLang: languageConfig) => void
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