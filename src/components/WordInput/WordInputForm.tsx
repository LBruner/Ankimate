import {NextPage} from "next";
import WordInputList from "./WordInputList";
import WordInputConfig from "./WordInputConfig";
import React, {useState} from "react";
import {cardInput} from "../../../models/WordInputProps";
import {nanoid} from "nanoid";
import axios from "axios";

const WordInputForm: NextPage = _ => {
    const [wordsList, setWordsList] = useState<cardInput[]>([{id: nanoid(),phonetic: '', phrase: '', translation: '', word: ''}]);
    const [curDeck, setCurDeck] = useState<string>('English');
    
    
    const onSubmitHandler = async(e: React.FormEvent)=>{
        e.preventDefault();
        
        const res = await axios.post('http://localhost:3000/api/addCards', {words: wordsList}).catch(error => console.log('e',error))

        console.log(res);
    }
    
    return (
        <form onSubmit={onSubmitHandler}>
            <WordInputConfig deck={curDeck} setDeck={setCurDeck}/>
            <WordInputList wordList={wordsList} setWordList={setWordsList}/>
            <button type={"submit"}>Add Cards.</button>
        </form>
    );
};

export default WordInputForm;