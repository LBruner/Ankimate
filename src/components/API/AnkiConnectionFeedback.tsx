import React, {Dispatch, SetStateAction, useEffect} from "react";
import {uiActions} from "../store/UISlice";
import {useDispatch} from "react-redux";
import useSWR from "swr";

interface AnkiConnectionFeedbackProps {
    isAnkiConnected: boolean,
    setIsAnkiConnected: Dispatch<SetStateAction<boolean>>;
}

const AnkiConnectionFeedback: React.FC<AnkiConnectionFeedbackProps> = ({setIsAnkiConnected, isAnkiConnected}) => {
    const dispatch = useDispatch();
    const fetcher = (url: string) => fetch(url, {mode: "no-cors"});
    const {data, error} = useSWR('http://127.0.0.1:8765', fetcher);

    useEffect(() => {
        const showAPIFeedback = async () => {
            
            if (!error && !data) {
                dispatch(uiActions.showNotification({
                    notification: {
                        title: `Connecting...`,
                        message: `Trying to connect to AnkiConnect.`,
                        status: 'alert'
                    }
                }));
            }
            if (error) {
                dispatch(uiActions.showNotification({
                    notification: {
                        title: `Error!`,
                        message: `Can't connect to AnkiConnect.`,
                        status: 'error'
                    }
                    
                }));
                setIsAnkiConnected(false);

            }

            if (isAnkiConnected) return;

            else if (data && !error) {
                dispatch(uiActions.showNotification({
                    notification: {
                        title: `Success!`,
                        message: `Connected to AnkiConnect.`,
                        status: 'success'
                    }
                }));
                setIsAnkiConnected(true);
            }
        };
        showAPIFeedback();
    }, [data, error]);
    return (
        <div>

        </div>
    );
};
export default AnkiConnectionFeedback;


