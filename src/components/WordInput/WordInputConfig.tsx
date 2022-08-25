import {NextPage} from "next";
import DeckPicker from "../language/DeckPicker";
import {WordInputConfigProps} from "../../../models/WordInputProps";
import LanguagePicker from "../language/LanguagePicker";

const WordInputConfig: NextPage<WordInputConfigProps> = ({deck,setDeck,language,setLanguage}) => {
    return (
        <div>
            <LanguagePicker language={language} setLanguage={setLanguage} setDeck={setDeck}/>
            <DeckPicker deck={deck} setDeck={setDeck}/>
        </div>
    );
};

export default WordInputConfig;