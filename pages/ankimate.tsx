import {NextPage} from "next";
import WordInputForm from "../src/components/WordInput/WordInputForm";
import WaitScreen from "../src/components/UI/WaitScreen";
import {useSelector} from "react-redux";
import {RootState} from "../src/components/store/StoreIndex";
import Notification from "../src/components/UI/Notification";
import ScrollToTop from "../src/components/UI/ScrollToTop";

const Ankimate: NextPage = () => {
    const notification: any = useSelector((state: RootState) => state.ui.activeNotification);
    const showNotification = useSelector((state: RootState) => state.ui.showNotification);


    console.log('MLm');
    return (
        <>
            <WaitScreen/>
            <WordInputForm/>
            <ScrollToTop/>
            {showNotification && <Notification notification={notification}/>}
        </>
    );
};

export default Ankimate;