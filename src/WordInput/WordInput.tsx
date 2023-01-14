import classes from './WordInput.module.css';
import React, {useEffect, useRef, useState} from "react";
import {CardInput, WordInput} from "../../models/WordInput";
import CardOptions from "../language/CardOptions";
import {Language} from "./WordInputForm";
import {GiUsaFlag} from "react-icons/all";
import usFlag from '../../public/flags/us.png'
import {url} from "inspector";
const WordInput: React.FC<WordInput> = (props) => {
    const {id, index, isFirstElement, isLastElement, languageConfig, isEnglishSet} = props;
    const {addInput, onDeleteWord, onUpdateWord, changeCardLanguage} = props.wordFunctions;

    const [isInputAdded, setIsInputAdded] = useState<boolean>(false);

    const wordRef = useRef<HTMLInputElement>(null);
    const phoneticRef = useRef<HTMLInputElement>(null);
    const phraseRef = useRef<HTMLInputElement>(null);
    const translationRef = useRef<HTMLInputElement>(null);

    const [language, setLanguage] = useState<Language>(isEnglishSet ? 'English' : 'French');

    useEffect(() => {
        setLanguage(isEnglishSet ? 'English' : 'French')
    }, [isEnglishSet]);


    const onWordUpdate = (_: React.ChangeEvent) => {
        const wordInput: CardInput = {
            id,
            word: wordRef.current!.value,
            phonetic: phoneticRef.current!.value,
            phrase: phraseRef.current!.value,
            translation: translationRef.current!.value,
            language
        };
        onUpdateWord(wordInput, index);

        if (!isInputAdded || isFirstElement) {
            addInput();
            setTimeout(() => {
                window.scrollTo({
                    top: window.scrollY + window.innerHeight,
                    behavior: 'smooth'
                });
            }, 500);
            setIsInputAdded(true);
        }
    };

    const onDeleteInput = () => {
        onDeleteWord(index);
        setIsInputAdded(false);
    };
    const isRequired = !isLastElement || isFirstElement;

    const setEnglish = () => {
        changeCardLanguage(id, 'English')
        languageConfig.setLanguage("English");
    }

    const setFrench = () => {
        changeCardLanguage(id, 'French')
        languageConfig.setLanguage("French");
    }

    const componentClasses = `${classes['input-container']} ${isEnglishSet ? classes.english : classes.french}`
    return (
        <div className={componentClasses} style={isEnglishSet ? {backgroundImage: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Usa-flag-3d-silk-flag-american-flag-us-flag-3d-flag-of-usa.jpg"} : {backgroundImage: 'https://cdn.pixabay.com/photo/2015/11/23/17/22/france-flag-1058699_960_720.jpg'}}>
            <input onChange={onWordUpdate} required={isRequired} ref={wordRef} type="text"
                   placeholder="Word..."/>
            <input onChange={onWordUpdate} ref={phoneticRef} type="text" placeholder="Phonetic..."/>
            <input onChange={onWordUpdate} ref={phraseRef} type="text"
                   placeholder="Phrase..."/>
            <input onChange={onWordUpdate} ref={translationRef} type="text"
                   placeholder="Translation..."/>
                <CardOptions changeCardLanguage={{setFrench, setEnglish}} isEnglishSet={isEnglishSet}
                             setLanguage={languageConfig.setLanguage} isFirstElement={isFirstElement} onDeleteInput={onDeleteInput}/>
        </div>
    );
};

export default WordInput;