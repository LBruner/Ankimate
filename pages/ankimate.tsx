import {NextPage} from "next";
import WordInputForm from "../src/components/WordInput/WordInputForm";
import WaitScreen from "../src/components/UI/WaitScreen";
import {useSelector} from "react-redux";
import {RootState} from "../src/components/store/StoreIndex";
import Notification from "../src/components/UI/Notification";
import ScrollToTop from "../src/components/UI/ScrollToTop";
import {useState} from "react";
import AnkiConnectionFeedback from "../src/components/API/AnkiConnectionFeedback";

const Ankimate: NextPage = () => {
    const notification: any = useSelector((state: RootState) => state.ui.activeNotification);
    const showNotification = useSelector((state: RootState) => state.ui.showNotification);
    const [isAnkiConnected, setIsAnkiConnected] = useState<boolean>(false);
    console.log('OI', notification);
    return (
        <>
            <WaitScreen/>
            <WordInputForm isAnkiConnected={isAnkiConnected}/>
            <ScrollToTop/>
            <AnkiConnectionFeedback isAnkiConnected={isAnkiConnected} setIsAnkiConnected={setIsAnkiConnected}/>
            {showNotification && <Notification notification={notification}/>}
        </>
    );
};

export default Ankimate;