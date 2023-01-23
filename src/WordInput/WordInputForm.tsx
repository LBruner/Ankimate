import WordInputList from "./WordInputList";
import React, {useEffect} from "react";
import classes from './WordInputForm.module.css';
import {useDispatch} from "react-redux";
import {uiActions} from "../store/UISlice";
import {nanoid} from "nanoid";
import {WordInputFormProps} from "../../models/WordInput";
import {CgFileAdd} from 'react-icons/cg';
import {VscFiles} from 'react-icons/vsc';
import {WordsData} from "../../models/Words";
import axios from "axios";
import CardAPIResponse from "../../models/API";
import {getNotificationMessage} from "../../models/Notification";

export const getDefaultState = () => {
    return {id: nanoid(), translation: '', phonetic: '', phrase: '', word: ''};
};

//TODO refactor language

const WordInputForm: React.FC<WordInputFormProps> = ({isAnkiConnected, language, wordState}) => {
    const {curLanguage, setCurLanguage} = language;
    const {setWordsList, wordsList} = wordState;

    const dispatch = useDispatch();

    useEffect(() => {
        if (window && wordsList.length > 1)
            window.onbeforeunload = () => {
                return `are you sure?`
            }
    }, [])
    
    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(uiActions.toggleIsWaiting());

        const wordsData: WordsData = {words: wordsList};
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

        //TODO fix this
        // setWordsList([getDefaultState()]);
    };

    const listenForEnterKey = (event: React.KeyboardEvent) => {
        if (event.code === '13') {
            onSubmitHandler(event);
        }
    };

    const shouldDisableButton = !isAnkiConnected || wordsList.length === 1;
    return (
        <form className={classes['form-container']} onSubmit={onSubmitHandler} onKeyDown={listenForEnterKey}>
            <WordInputList wordList={wordsList} setWordList={setWordsList}
                           languageConfig={{curLanguage, setLanguage: setCurLanguage}}/>
            <button disabled={shouldDisableButton} className={classes['add-card-btn']}
                    type={"submit"}>Add {wordsList.length} {wordsList.length === 1 ? 'Card' : 'Cards'} {wordsList.length === 1 ?
                <CgFileAdd className={classes.icon}/> : <VscFiles className={classes.icon}/>}
            </button>
        </form>
    );
};

export default WordInputForm;