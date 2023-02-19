import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../src/store/StoreIndex";
import WordInputForm, {getDefaultState} from "../src/WordInput/WordInputForm";
import AnkiConnectionFeedback from "../src/API/AnkiConnectionFeedback";
import Notification from "../src/UI/Notification";
import {CardInput} from "../models/WordInput";
import ToolBox from "../src/UI/Toolbox";
import {Language} from "../models/Words";
import WaitScreen from "../src/UI/WaitScreen";

const Ankimate: React.FC = _ => {
    const [isAnkiConnected, setIsAnkiConnected] = useState<boolean>(false);
    const notification: any = useSelector((state: RootState) => state.ui.activeNotification);
    const showNotification = useSelector((state: RootState) => state.ui.showNotification);
    const [curLanguage, setCurLanguage] = useState<Language>("English");
    const [wordsList, setWordsList] = useState<CardInput[]>([{...getDefaultState(), language: curLanguage}]);

    return (
        <>
            <WaitScreen/>
            <ToolBox setWordList={setWordsList} wordsListLength={wordsList.length}/>
            <WordInputForm isAnkiConnected={isAnkiConnected} wordState={{setWordsList, wordsList}}
                           language={{curLanguage, setCurLanguage}}/>
            <AnkiConnectionFeedback isAnkiConnected={isAnkiConnected} setIsAnkiConnected={setIsAnkiConnected}/>
            {showNotification && <Notification notification={notification}/>}
        </>
    );
};

export default Ankimate;