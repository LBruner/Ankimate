import {NextPage} from "next";
import Navbar from "../src/components/UI/Navbar";
import WordInputForm from "../src/components/WordInput/WordInputForm";

const Ankimate: NextPage = () => {
    return (
        <>
        <Navbar/>
        <WordInputForm/>
        </>
    );
};

export default Ankimate;