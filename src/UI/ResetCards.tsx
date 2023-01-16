import {RxReset} from 'react-icons/rx'
import classes from './ResetCards.module.css';
import React, {Dispatch, SetStateAction} from "react";
import {CardInput} from "../../models/WordInput";
import {getDefaultState} from "../WordInput/WordInputForm";

type ResetCards = {
    setWordList: Dispatch<SetStateAction<CardInput[]>>
}

const ResetCards: React.FC<ResetCards> = ({setWordList}) => {
    const onClickHandler = () =>{
        setWordList([{...getDefaultState(),language: "English"}])
    }
    
    return (
        <div onClick={onClickHandler} className={classes.container}>
            <RxReset className={classes.icon}/>
        </div>
    );
};

export default ResetCards;