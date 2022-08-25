import {Dispatch, SetStateAction} from "react";
import {languageConfig} from "./Card";

export interface cardInput {
    id: string,
    word: string,
    phonetic: string,
    phrase: string,
    translation: string
}

export interface wordInputListProps {
    wordList: cardInput[];
    setWordList: Dispatch<SetStateAction<cardInput[]>>
}

export interface wordInputProps{
    index: number,
    id: string, 
    addInput: () => void;
    onUpdateWord: (word: cardInput, id: number) => void;
    onDeleteWord: (id: number) => void;
    isFirstElement: boolean
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
