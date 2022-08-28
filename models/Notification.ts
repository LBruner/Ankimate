import {uiActions} from "../src/components/store/UISlice";
import {Dispatch} from "redux";

export default interface NotificationProps {
    notification: {
        title: string,
        message: string,
        status: string
    };
}

export const createNotification = (addedWords: string[], dispatchFn: Dispatch) => {
    if (!addedWords) return;
    if (addedWords.length > 0) {
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
