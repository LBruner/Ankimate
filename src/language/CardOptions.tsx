import usFlag from '../../public/flags/us.png'
import frFlag from '../../public/flags/france.png'
import React, {Dispatch, SetStateAction} from "react";
import classes from './CardOptions.module.css'
import {Language} from "../WordInput/WordInputForm";
import { TiCancel } from 'react-icons/ti';

const CardOptions: React.FC<{
    setLanguage: Dispatch<SetStateAction<Language>>, isEnglishSet: boolean, changeCardLanguage: {
        setFrench: () => void;
        setEnglish: () => void;
    },
    isFirstElement: boolean;
    onDeleteInput: () => void;
}> = ({isEnglishSet, changeCardLanguage, isFirstElement, onDeleteInput}) => {
    
    const englishClasses = `${classes['button-box']} ${!isEnglishSet && classes.disabled}`
    const frenchClasses = `${classes['button-box']} ${isEnglishSet && classes.disabled}`
    
    return (
        <div className={classes['container']}>
            <button
                    onClick={changeCardLanguage.setEnglish} className={englishClasses} type={"button"}><img
                className={classes.image} src={usFlag.src}/>
            </button>
            <button className={isFirstElement ? classes['button-disabled'] : classes['delete-button']}
                    type={"button"}
                    disabled={isFirstElement} onClick={onDeleteInput}><TiCancel className={classes.icons}/>
            </button>
            <button type={"button"} onClick={changeCardLanguage.setFrench} className={frenchClasses}><img
                className={classes.image}
                src={frFlag.src}/>
            </button>
        </div>
    );
};

export default CardOptions;