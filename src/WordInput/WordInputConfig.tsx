import DeckPicker from "../language/DeckPicker";
import {WordInputConfigProps} from "../../../models/WordInput";
import LanguagePicker from "../language/LanguagePicker";
import React from "react";

const WordInputConfig: React.FC<WordInputConfigProps> = ({deck,setDeck,language,setLanguage}) => {
    return (
        <div>
            <LanguagePicker language={language} setLanguage={setLanguage} setDeck={setDeck}/>
            <DeckPicker deck={deck} setDeck={setDeck}/>
        </div>
    );
};

export default WordInputConfig;