import {NextPage} from "next";
import WordInput from "./WordInput";
import {cardInput, wordInputListProps} from "../../../models/WordInputProps";
import {nanoid} from "nanoid";
import {useDispatch} from "react-redux";
import {uiActions} from "../store/UISlice";

const WordInputList: NextPage<wordInputListProps> = ({wordList, setWordList}) => {
    const dispatch = useDispatch();
    
    const onUpdateWord = (input: cardInput, index: number) => {
        let newArray = [...wordList];
        newArray[index] = input;
        setWordList(newArray)
        dispatch(uiActions.setFieldCount({fieldCount : wordList.length - 1}))
    }
    
    const addInput = () =>{
        setWordList([...wordList, {id: nanoid(), word: '', translation: '', phrase: '', phonetic: ''}])
    }
    
    const onDeleteInput = (index: number) =>{
        if (wordList.length === 1) return;
        let newWordList: cardInput[] = [...wordList];
        newWordList = newWordList.filter((item, i) => i !== index);
        setWordList(newWordList);
    }

    const isFirstElement = (curInput: number): boolean => {
        return curInput === 0 && wordList.length <= 1
    }
    
    return (
        <div>
            {wordList.length > 0 && wordList.map((item,index) => <WordInput key={item.id} id={item.id} index={index} onUpdateWord={onUpdateWord} addInput={addInput} onDeleteWord={onDeleteInput} isFirstElement={isFirstElement(index)}/>)}
        </div>
    );
};

export default WordInputList;