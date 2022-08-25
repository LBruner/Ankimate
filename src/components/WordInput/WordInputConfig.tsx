import {NextPage} from "next";
import DeckPicker from "../language/DeckPicker";
import {WordInputConfigProps} from "../../../models/WordInputProps";

const WordInputConfig: NextPage<WordInputConfigProps> = ({deck,setDeck}) => {
    return (
        <div>
            <DeckPicker deck={deck} setDeck={setDeck}/>
        </div>
    );
};

export default WordInputConfig;