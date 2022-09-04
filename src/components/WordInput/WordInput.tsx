import {NextPage} from "next";
import classes from './WordInput.module.css';
import React, {useRef, useState} from "react";
import {CardInput, wordInputProps} from "../../../models/WordInputProps";

const WordInput: NextPage<wordInputProps> = ({id,index,addInput,onUpdateWord,onDeleteWord, isFirstElement,isLastElement}) => {
    const [isInputAdded, setIsInputAdded] = useState<boolean>(false);
    
    const wordRef = useRef<HTMLInputElement>(null);
    const phoneticRef = useRef<HTMLInputElement>(null);
    const phraseRef = useRef<HTMLInputElement>(null);
    const translationRef = useRef<HTMLInputElement>(null);
    console.log('last',isLastElement);
    const onWordUpdate = (e: React.ChangeEvent) =>{
        e.preventDefault()
        
        const wordInput:CardInput = {
            id,
            word: wordRef.current!.value,
            phonetic: phoneticRef.current!.value,
            phrase: phraseRef.current!.value,
            translation: translationRef.current!.value,
        }
        onUpdateWord(wordInput, index);
        
        if(!isInputAdded || isFirstElement){
            addInput();
            setTimeout(() =>{
                window.scrollTo({
                    top: window.scrollY + window.innerHeight,
                    behavior: 'smooth'
                })
            }, 500)
            setIsInputAdded(true)
        }
    }
    
    const onDeleteInput = () =>{
        onDeleteWord(index)
        setIsInputAdded(false);
    }
    const isRequired = !isLastElement || isFirstElement;
    
    return (
        <div className={classes['input-container']}>
            <input onChange={onWordUpdate} required={isRequired} ref={wordRef} type="text" placeholder='Word...'/>
            <input onChange={onWordUpdate} ref={phoneticRef} type="text" placeholder='Phonetic...'/>
            <input onChange={onWordUpdate} required={isRequired} ref={phraseRef} type="text" placeholder='Phrase...'/>
            <input onChange={onWordUpdate} required={isRequired}  ref={translationRef} type="text" placeholder='Translation...'/>
            <button className={isFirstElement ? classes['button-disabled'] : ''} type={"button"} disabled={isFirstElement} onClick={onDeleteInput}>X</button>
        </div>
    );
};

export default WordInput;