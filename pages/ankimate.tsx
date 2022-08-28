import {NextPage} from "next";
import WordInputForm from "../src/components/WordInput/WordInputForm";
import WaitScreen from "../src/components/UI/WaitScreen";

const Ankimate: NextPage = () => {

    return (
        <>
            <WaitScreen/>
            <WordInputForm/>
        </>
    );
};

export default Ankimate;