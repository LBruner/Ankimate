import userDecks from '../../../user/decks.json';
import {availableInput, availableOutputs, languagePickerProps} from "../../../models/WordInput";
import React from "react";

const LanguagePicker: React.FC<languagePickerProps> = ({language, setLanguage, setDeck}) => {

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = {...language};

        if (e.target.name === 'inputLanguage') {
            const optionName = e.target[e.target.selectedIndex].textContent;

            const hasDeck = userDecks.allDecks.filter(item => item === optionName);
            newLanguage.input = e.target.value as availableInput;

            if (hasDeck.length !== 0)
                setDeck(optionName!);
        } else if (e.target.name === 'outputLanguage') {
            newLanguage.output = e.target.value as availableOutputs;
        }

        if (newLanguage.input === newLanguage.output) {
            const optionsArray: HTMLOptionElement[] = Array.from(e.target) as HTMLOptionElement[];
            const filteredOptions = optionsArray.filter((item) => item.value !== newLanguage.input);
            newLanguage.output = filteredOptions[0].value as availableOutputs; //TODO: types
        }

        setLanguage(newLanguage);
    };

    return (<div>
        <div>
            <p>Input</p>
            <select value={language.input} onChange={onChangeSelect} name="inputLanguage"
                    id="">
                <option value="pt">Portuguese</option>
                <option value="en">English</option>
                <option value="fr">French</option>
            </select>
        </div>
        <div>
            <p>Output</p>
            <select value={language.output} onChange={onChangeSelect} name="outputLanguage" id="">
                <option value="pt">Portuguese</option>
                <option value="en">English</option>
                <option value="fr">French</option>
            </select>
        </div>
    </div>);
};

export default LanguagePicker;