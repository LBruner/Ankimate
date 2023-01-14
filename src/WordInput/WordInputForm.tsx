import WordInputList from "./WordInputList";
import WordInputConfig from "./WordInputConfig";
import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from './WordInputForm.module.css';
import { useDispatch } from "react-redux";
import { uiActions } from "../store/UISlice";
import { nanoid } from "nanoid";
import {CardInput} from "../../models/WordInput";
import {WordsData} from "../../models/Words";
import CardAPIResponse from "../../models/API";
import {getNotificationMessage} from "../../models/Notification";
import {languageConfig} from "../../models/Card";

export const getDefaultState = () => {
    return { id: nanoid(), translation: '', phonetic: '', phrase: '', word: ''};
};

interface WordInputFormProps {
    isAnkiConnected: boolean;
}

//TODO refactor language
export type Language = 'English' | 'French';

const WordInputForm: React.FC<WordInputFormProps> = ({ isAnkiConnected }) => {
    //TODO: refactor deck picking
    const [curLanguage, setCurLanguage] = useState<Language>("English");
    const [language, setLanguage] = useState<languageConfig>({ input: 'en', output: 'pt', });
    const [wordsList, setWordsList] = useState<CardInput[]>([{...getDefaultState(), language: curLanguage}]);
    const [curDeck, setCurDeck] = useState<string>('English');
    
    const dispatch = useDispatch();
    //TODO refactor
    

    useEffect(() => {
        if (window && wordsList.length > 1)
            window.onbeforeunload = () => {
                return `are you sure?`
            }

    }, [])
    
    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(uiActions.toggleIsWaiting());
        const wordsData: WordsData = { words: wordsList, deck: curDeck, language };
        let notification;

        const response = await axios.post<CardAPIResponse>('http://localhost:3000/api/addCards', wordsData);

        try {
            notification = getNotificationMessage(response.data);
        } catch (error) {
            // notification = getNotificationMessage(error as AxiosError<{ error: string }>, null);
        } finally {
        }
        dispatch(uiActions.showNotification(notification));

        dispatch(uiActions.toggleIsWaiting());

        // setWordsList([getDefaultState()]);
    };

    const listenForEnterKey = (event: React.KeyboardEvent) => {
        if (event.code === '13') {
            onSubmitHandler(event);
        }
    };

    const shouldDisableButton = !isAnkiConnected;

    return (
        <form className={classes['form-container']} onSubmit={onSubmitHandler} onKeyDown={listenForEnterKey}>
            <WordInputConfig deck={curDeck} setDeck={setCurDeck} language={language} setLanguage={setLanguage} />
            <WordInputList wordList={wordsList} setWordList={setWordsList} languageConfig={{curLanguage,setLanguage:setCurLanguage}}/>
            <button disabled={shouldDisableButton} className={classes['add-card-btn']} type={"submit"}>Add Cards.
            </button>
        </form>
    );
};

export default WordInputForm;