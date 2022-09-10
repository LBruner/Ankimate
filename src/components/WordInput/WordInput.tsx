import classes from './WordInput.module.css';
import React, {useRef, useState} from "react";
import {CardInput, wordInput} from "../../../models/WordInput";

const WordInput: React.FC<wordInput> = (props) => {
    const {id, index, isFirstElement, isLastElement,} = props;
    const {addInput, onDeleteWord, onUpdateWord} = props.wordFunctions;

    const [isInputAdded, setIsInputAdded] = useState<boolean>(false);

    const wordRef = useRef<HTMLInputElement>(null);
    const phoneticRef = useRef<HTMLInputElement>(null);
    const phraseRef = useRef<HTMLInputElement>(null);
    const translationRef = useRef<HTMLInputElement>(null);

    const onWordUpdate = (_: React.ChangeEvent) => {
        const wordInput: CardInput = {
            id,
            word: wordRef.current!.value,
            phonetic: phoneticRef.current!.value,
            phrase: phraseRef.current!.value,
            translation: translationRef.current!.value,
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

    return (
        <div className={classes['input-container']}>
            <input onChange={onWordUpdate} required={isRequired} ref={wordRef} type="text"
                   placeholder="Word..."/>
            <input onChange={onWordUpdate} ref={phoneticRef} type="text" placeholder="Phonetic..."/>
            <input onChange={onWordUpdate} required={isRequired} ref={phraseRef} type="text"
                   placeholder="Phrase..."/>
            <input onChange={onWordUpdate} required={isRequired} ref={translationRef} type="text"
                   placeholder="Translation..."/>
            <button className={isFirstElement ? classes['button-disabled'] : ''} type={"button"}
                    disabled={isFirstElement} onClick={onDeleteInput}>X
            </button>
        </div>
    );
};

export default WordInput;