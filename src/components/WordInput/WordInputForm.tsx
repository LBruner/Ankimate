import {NextPage} from "next";
import WordInputList from "./WordInputList";
import WordInputConfig from "./WordInputConfig";
import React, {useState} from "react";
import {cardInput} from "../../../models/wordInputModel";
import {nanoid} from "nanoid";
import axios from "axios";

const WordInputForm: NextPage = _ => {
    const [wordsList, setWordsList] = useState<cardInput[]>([{id: nanoid(),phonetic: '', phrase: '', translation: '', word: ''}]);

    const onSubmitHandler = async(e: React.FormEvent)=>{
        e.preventDefault();
        // fetch('', {
        //     body: JSON.stringify({words: wordsList}),
        //     method: 'POST'
        // })
        const res = await axios.post('http://localhost:3000/api/addCards', {words: wordsList});
        console.log(res);
    }
    
    return (
        <form onSubmit={onSubmitHandler}>
            <WordInputConfig/>
            <WordInputList wordList={wordsList} setWordList={setWordsList}/>
            <button type={"submit"}>Add Cards.</button>
        </form>
    );
};

export default WordInputForm;