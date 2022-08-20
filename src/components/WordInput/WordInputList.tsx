import {NextPage} from "next";
import WordInput from "./WordInput";
import {cardInput, wordInputListProps} from "../../../models/wordInputModel";
import {nanoid} from "nanoid";

const WordInputList: NextPage<wordInputListProps> = ({wordList, setWordList}) => {
    
    const onUpdateWord = (input: cardInput, index: number) => {
        let newArray = [...wordList];
        console.log('OI', newArray);
        newArray[index] = input;
        console.log('MM' ,newArray[index]);
        setWordList(newArray)
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