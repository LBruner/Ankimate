import WordInputList from "./WordInputList";
import WordInputConfig from "./WordInputConfig";
import React, {useState} from "react";
import {CardInput} from "../../../models/WordInput";
import axios from "axios";
import {languageConfig} from "../../../models/Card";
import {WordsData} from "../../../models/Words";
import classes from './WordInputForm.module.css';
import {useDispatch} from "react-redux";
import {uiActions} from "../store/UISlice";
import {nanoid} from "nanoid";
import {getNotificationMessage} from "../../../models/Notification";
import CardAPIResponse from "../../../models/API";

export const getDefaultState = () => {
    return {id: nanoid(), translation: '', phonetic: '', phrase: '', word: ''};
};

interface WordInputFormProps {
    isAnkiConnected: boolean;
}

const WordInputForm: React.FC<WordInputFormProps> = ({isAnkiConnected}) => {
    const [wordsList, setWordsList] = useState<CardInput[]>([getDefaultState()]);
    const [curDeck, setCurDeck] = useState<string>('English');
    const [language, setLanguage] = useState<languageConfig>({input: 'en', output: 'pt',});
    const dispatch = useDispatch();

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

//TODO: if wordlistlenght = 1 => check if is empty

        dispatch(uiActions.toggleIsWaiting());
        const wordsData: WordsData = {words: wordsList, deck: curDeck, language};
        let notification;

        const response = await axios.post<CardAPIResponse>('http://localhost:3000/api/addCards', wordsData);

        try {
            console.log('response',response);
            notification = getNotificationMessage(response.data);
            console.log('NOTIFICATION', notification);
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
            <WordInputConfig deck={curDeck} setDeck={setCurDeck} language={language} setLanguage={setLanguage}/>
            <WordInputList wordList={wordsList} setWordList={setWordsList}/>
            <button disabled={shouldDisableButton} className={classes['add-card-btn']} type={"submit"}>Add Cards.
            </button>
        </form>
    );
};

export default WordInputForm;