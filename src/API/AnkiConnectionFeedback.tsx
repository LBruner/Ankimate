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
    const {data, error} = useSWR(process.env.ANKICONNECT_PORT, fetcher);

    useEffect(() => {
        const showAPIFeedback = async () => {
            if (!data || error) {
                dispatch(uiActions.showNotification({
                    notification: {
                        details: {
                            title: `Connecting...`,
                            message: `Trying to connect to AnkiConnect.`,
                            status: 'alert'
                        }
                    }
                }));
                setIsAnkiConnected(false);
            }

            if (isAnkiConnected) return;

            else if (data && !error) {
                dispatch(uiActions.showNotification({
                    notification: {
                        details: {
                            title: `Success!`,
                            message: `Connected to AnkiConnect.`,
                            status: 'success'
                        },
                        timer: 3000
                    }
                }));
                setIsAnkiConnected(true);
            }
        };
        showAPIFeedback();
    }, [data, error]);
    return (
        <></>
    );
};
export default AnkiConnectionFeedback;


