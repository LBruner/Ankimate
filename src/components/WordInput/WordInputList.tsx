import WordInput from "./WordInput";
import {CardInput, wordInputListProps} from "../../../models/WordInput";
import {useDispatch} from "react-redux";
import {uiActions} from "../store/UISlice";
import {getDefaultState} from "./WordInputForm";
import React from "react";

const WordInputList: React.FC<wordInputListProps> = ({wordList, setWordList}) => {
    const dispatch = useDispatch();

    const onUpdateWord = (input: CardInput, index: number) => {
        let newArray = [...wordList];
        newArray[index] = input;
        setWordList(newArray)
        dispatch(uiActions.setFieldCount({fieldCount : wordList.length - 1}))
    }
    
    const addInput = () =>{
        setWordList([...wordList, getDefaultState()])
    }
    
    const onDeleteInput = (index: number) =>{
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


    const wordFunctions = {onUpdateWord: onUpdateWord, addInput, onDeleteWord: onDeleteInput};
    return (
        <div>
            {wordList.length > 0 && wordList.map((item,index) => <WordInput key={item.id} id={item.id} index={index} wordFunctions={wordFunctions} isLastElement={isLastElement(index)} isFirstElement={isFirstElement(index)}/>)}
        </div>
    );
};

export default WordInputList;