import {NextPage} from "next";
import WordInputList from "./WordInputList";
import WordInputConfig from "./WordInputConfig";
import React, {useState} from "react";
import {cardInput} from "../../../models/WordInputProps";
import {nanoid} from "nanoid";
import axios from "axios";
import {languageConfig} from "../../../models/Card";
import {WordsData} from "../../../models/Words";
import classes from './WordInputForm.module.css';
import {useDispatch} from "react-redux";
import {uiActions} from "../store/UISlice";

const WordInputForm: NextPage = _ => {
    const [wordsList, setWordsList] = useState<cardInput[]>([{
        id: nanoid(),
        phonetic: '',
        phrase: '',
        translation: '',
        word: ''
    }]);
    const [curDeck, setCurDeck] = useState<string>('English');
    const [language, setLanguage] = useState<languageConfig>({input: 'en', output: 'pt',});
    const dispatch = useDispatch()
    
    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(uiActions.toggleIsWaiting());
        const wordsData: WordsData = {words: wordsList, deck: curDeck, language};
        const res = await axios.post('http://localhost:3000/api/addCards', wordsData).catch(error => console.log('e', error));
        dispatch(uiActions.toggleIsWaiting());

        console.log(res);
    };

    const listenForEnterKey = (event: React.KeyboardEvent) => {
        if (event.code === '13') {
            onSubmitHandler(event)
        }
    }
    
    return (
        <form className={classes['form-container']} onSubmit={onSubmitHandler} onKeyDown={listenForEnterKey}>
            <WordInputConfig deck={curDeck} setDeck={setCurDeck} language={language} setLanguage={setLanguage}/>
            <WordInputList wordList={wordsList} setWordList={setWordsList}/>
            <button className={classes['add-card-btn']} type={"submit"}>Add Cards.</button>
        </form>
    );
};

export default WordInputForm;