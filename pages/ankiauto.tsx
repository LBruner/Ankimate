import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../src/store/StoreIndex";
import WaitScreen from "../src/UI/WaitScreen";
import WordInputForm from "../src/WordInput/WordInputForm";
import ScrollToTop from "../src/UI/ScrollToTop";
import AnkiConnectionFeedback from "../src/API/AnkiConnectionFeedback";
import Notification from "../src/UI/Notification";

const Ankiauto: React.FC = props => {
    const [isAnkiConnected, setIsAnkiConnected] = useState<boolean>(false);
    const notification: any = useSelector((state: RootState) => state.ui.activeNotification);
    const showNotification = useSelector((state: RootState) => state.ui.showNotification);

    return (
        <>
            <WaitScreen />
            <WordInputForm isAnkiConnected={isAnkiConnected} />
            <ScrollToTop />
            <AnkiConnectionFeedback isAnkiConnected={isAnkiConnected} setIsAnkiConnected={setIsAnkiConnected} />
            {showNotification && <Notification notification={notification} />}

        </>
    );
};

export default Ankiauto;