import WordInput from "./WordInput";
import {CardInput, WordInputListProps} from "../../models/WordInput";
import React from "react";
import {getDefaultState, Language} from "./WordInputForm";

const WordInputList: React.FC<WordInputListProps> = ({wordList, setWordList, languageConfig}) => {
    const onUpdateWord = (input: CardInput, index: number) => {
        let newArray = [...wordList];
        newArray[index] = input;
        setWordList(newArray)
    }

    const addInput = () => {
        setWordList([...wordList, {...getDefaultState(), language: languageConfig.curLanguage}])
    }

    const onDeleteInput = (index: number) => {
        if (wordList.length === 1) return;
        let newWordList: CardInput[] = [...wordList];
        newWordList = newWordList.filter((item, i) => i !== index);
        setWordList(newWordList);
    };

    const isFirstElement = (curInput: number): boolean => {
        return curInput === 0 && wordList.length <= 1;
    };

    const isLastElement = (curInput: number): boolean => {
        return curInput === wordList.length - 1;
    };

    const changeCardLanguage = (id: string, language: Language) => {
        setWordList(prevState => {
            const item = prevState.find((item) => item.id === id)
            item!.language = language;
            return [...prevState]
        })
    }
    
    const wordFunctions = {onUpdateWord, addInput, onDeleteWord: onDeleteInput, changeCardLanguage};
    return (
        <div>
            {wordList.length > 0 && wordList.map((item, index) => {
                return <WordInput key={item.id} id={item.id} index={index}
                                  wordFunctions={wordFunctions}
                                  isEnglishSet={wordList[index].language === "English"}
                                  languageConfig={languageConfig}
                                  isLastElement={isLastElement(index)}
                                  isFirstElement={isFirstElement(index)}/>
            })}
        </div>
    );
};

export default WordInputList;