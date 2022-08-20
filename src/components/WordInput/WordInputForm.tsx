import {NextPage} from "next";
import WordInputList from "./WordInputList";
import WordInputConfig from "./WordInputConfig";
import {useState} from "react";
import {cardInput} from "../../../models/wordInputModel";
import {nanoid} from "nanoid";

const WordInputForm: NextPage = _ => {
    const [wordsList, setWordsList] = useState<cardInput[]>([{id: nanoid(),phonetic: '', phrase: '', translation: '', word: ''}]);

    return (
        <form>
            <WordInputConfig/>
            <WordInputList wordList={wordsList} setWordList={setWordsList}/>
        </form>
    );
};

export default WordInputForm;