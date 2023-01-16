import React, {Dispatch, SetStateAction} from "react";
import classes from './Toolbox.module.css';
import ScrollToTop from "./ScrollToTop";
import ResetCards from "./ResetCards";
import {CardInput} from "../../models/WordInput";

type ToolboxProps = {
    wordsListLength: number;
    setWordList: Dispatch<SetStateAction<CardInput[]>>
}

const ToolBox: React.FC<ToolboxProps> = ({wordsListLength, setWordList}) => {
    
    if (wordsListLength < 3)
        return <></>
    return (
        <div className={classes['box-container']}>
            <ResetCards setWordList={setWordList}/>
            <ScrollToTop/>
        </div>
    );
};

export default ToolBox;