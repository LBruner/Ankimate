import {Dispatch, SetStateAction} from "react";

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