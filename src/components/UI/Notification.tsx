import type {NextPage} from 'next';
import classes from './Notification.module.css';
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../store/UISlice";
import NotificationProps from "../../../models/Notification";
import {RootState} from "../store/StoreIndex";

const Notification: NextPage<NotificationProps> = ({notification}) => {
    const {message,status,title} = notification;
    const dispatch = useDispatch();
    const showNotification = useSelector((state: RootState) => state.ui.showNotification);

    let statusClasses = '';

    if (status === 'success') {
        statusClasses = classes.success;
    }

    if (status === 'error') {
        statusClasses = classes.error;
    }

    if (status === 'alert') {
        statusClasses = classes.pending;
    }

    const activeClasses = `${classes.notification} ${statusClasses}`;

    const onClickHandler = () => {
        dispatch(uiActions.hideNotification());
    };

    return (
        <>
            {
                showNotification && <div className={activeClasses} onClick={onClickHandler}>
                <h2>{title}</h2>
                <h4>{message}</h4>
            </div>
            }
        </>

    );
};

export default Notification;