import {NextPage} from "next";
import classes from './WordInput.module.css';
import React, {useRef, useState} from "react";
import {cardInput, wordInputProps} from "../../../models/WordInputProps";

const WordInput: NextPage<wordInputProps> = ({id,index,addInput,onUpdateWord,onDeleteWord, isFirstElement}) => {
    const [isInputAdded, setIsInputAdded] = useState<boolean>(false);
    
    const wordRef = useRef<HTMLInputElement>(null);
    const phoneticRef = useRef<HTMLInputElement>(null);
    const phraseRef = useRef<HTMLInputElement>(null);
    const translationRef = useRef<HTMLInputElement>(null);
    
    const onWordUpdate = (e: React.ChangeEvent) =>{
        e.preventDefault()
        
        const wordInput:cardInput = {
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
    
    return (
        <div className={classes['input-container']}>
            <input onChange={onWordUpdate} required ref={wordRef} type="text" placeholder='Word...'/>
            <input onChange={onWordUpdate} ref={phoneticRef} type="text" placeholder='Phonetic...'/>
            <input onChange={onWordUpdate} required ref={phraseRef} type="text" placeholder='Phrase...'/>
            <input onChange={onWordUpdate} required  ref={translationRef} type="text" placeholder='Translation...'/>
            <button className={isFirstElement ? classes['button-disabled'] : ''} type={"button"} disabled={isFirstElement} onClick={onDeleteInput}>X</button>
        </div>
    );
};

export default WordInput;