import {NextPage} from "next";
import WordInputList from "./WordInputList";
import WordInputConfig from "./WordInputConfig";
import React, {useState} from "react";
import {cardInput} from "../../../models/WordInputProps";
import {nanoid} from "nanoid";
import axios from "axios";
import {languageConfig} from "../../../models/Card";
import {WordsData} from "../../../models/Words";

const WordInputForm: NextPage = _ => {
    const [wordsList, setWordsList] = useState<cardInput[]>([{id: nanoid(),phonetic: '', phrase: '', translation: '', word: ''}]);
    const [curDeck, setCurDeck] = useState<string>('English');
    const [language, setLanguage] = useState<languageConfig>({input: 'en', output: 'pt',});

    const onSubmitHandler = async(e: React.FormEvent)=>{
        e.preventDefault();
        
        const wordsData: WordsData = {words: wordsList,deck: curDeck,language}
        const res = await axios.post('http://localhost:3000/api/addCards', wordsData).catch(error => console.log('e',error))

        console.log(res);
    }
    
    return (
        <form onSubmit={onSubmitHandler}>
            <WordInputConfig deck={curDeck} setDeck={setCurDeck} language={language} setLanguage={setLanguage}/>
            <WordInputList wordList={wordsList} setWordList={setWordsList}/>
            <button type={"submit"}>Add Cards.</button>
        </form>
    );
};

export default WordInputForm;