import classes from './Notification.module.css';
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../store/UISlice";
import {Notification} from "../../models/Notification";
import {RootState} from "../store/StoreIndex";
import React, {useEffect} from "react";

const Notification: React.FC<Notification> = ({notification}) => {
    const {details, timer} = notification;
    const {title,message,status} = details;

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

    useEffect(() => {
        if (timer){
            setTimeout(() =>{
                console.log('M<ML');
                dispatch(uiActions.hideNotification());
            }, timer)
        }
    }, [dispatch, timer]);
    
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