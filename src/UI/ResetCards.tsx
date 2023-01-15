import {RxReset} from 'react-icons/rx'
import classes from './ResetCards.module.css';
import React from "react";


const ResetCards: React.FC = _ => {
    return (
        <div className={classes.container}>
            <RxReset className={classes.icon}/>
        </div>
    );
};

export default ResetCards;