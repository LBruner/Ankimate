import React from "react";
import classes from './Toolbox.module.css';
import ScrollToTop from "./ScrollToTop";
import ResetCards from "./ResetCards";

type ToolboxProps = {
    wordsListLength: number;
}

const ToolBox: React.FC<ToolboxProps> = ({wordsListLength}) => {
    
    if (wordsListLength < 3)
        return <></>
    return (
        <div className={classes['box-container']}>
            <ResetCards/>
            <ScrollToTop/>
        </div>
    );
};

export default ToolBox;