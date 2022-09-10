import {uiActions} from "../src/components/store/UISlice";
import {Dispatch} from "redux";
import {AxiosError, AxiosResponse} from "axios";


export default interface NotificationProps {
    notification: {
        title: string,
        message: string,
        status: string
    },
    timer: number
}

type CustomAxiosResponse = AxiosResponse<{ cardsAdded: string[] }> | null
type CustomAxiosError = AxiosError<{ error: string }, any> | null

export const getNotificationMessage = (error: CustomAxiosError, response: CustomAxiosResponse): {notification: {
    title: string, message: string, status: string
    }} | null => {
    if (error) {
        return {
            notification: {
                title: `Error!`,
                message: `${error.response?.data.error ?? 'Something went wrong'} (${error.response?.status})`,
                status: 'error'
            }
        }        
    }
    if (response) {
        const {cardsAdded} = response.data;

        if (cardsAdded.length > 0) return {
            notification: {
                title: `${cardsAdded.length} cards were added!`,
                message: 'No errors',
                status: 'success'
            }
        };
    }
    return null;
};

export const createNotification = (addedWords: string[], dispatchFn: Dispatch) => {
    if (!addedWords) return;
    if (addedWords.length > 0 || !addedWords) {
        dispatchFn(uiActions.showNotification(
            {
                notification: {
                    title: `${addedWords.length} cards were added!`,
                    message: 'No errors',
                    status: 'success'
                }
            }));
    }
        // else if (errorNumber !== 0 && successNumber !== 0) {
        //     dispatch(uiActions.showNotification(
        //         {
        //             notification: {
        //                 title: `${data.cardsLog.successful.length} cards were added!`,
        //                 message: `${errorNumber} cards were not added`,
        //                 status: 'alert'
        //             }
        //         }))
    // } 
    else {
        dispatchFn(uiActions.showNotification(
            {
                notification: {
                    title: `No cards were added`,
                    message: `Something went wrong`,
                    status: 'error'
                }
            }));
    }
};
