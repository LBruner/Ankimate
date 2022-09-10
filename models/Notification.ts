import CardAPIResponse from "./API";

type NotificationStatus = "success" | "alert" | "error";

export interface Notification {
    notification: {
        details: { title: string, message: string, status: NotificationStatus },
        timer?: number
    };
}

export const getNotificationMessage = (notificationInput: CardAPIResponse): Notification => {
    const {error, statusCode, addedCards} = notificationInput;

    if (error) {
        return {
            notification: {details: {title: `Error (${statusCode})`, message: `${error}`, status: "error"}},
        };
    }

    if (!addedCards || addedCards.length === 0)
        return {
            notification: {details: {title: `Alert`, message: `No cards were added`, status: "alert"}},
        };

    const appropriateWord = addedCards.length > 1 ? 'cards' : 'card';

    return {
        notification: {
            details: {
                title: `Success!`,
                message: `${addedCards?.length} ${appropriateWord} were added.`,
                status: "success"
            }
        },
    };
};

