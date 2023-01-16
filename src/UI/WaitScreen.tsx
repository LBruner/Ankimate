import {useSelector} from "react-redux";
import {RootState} from "../store/StoreIndex";
import classes from './WaitScreen.module.css';
import React, {useEffect} from "react";

const WaitScreen: React.FC = () => {
    const isWaiting: boolean = useSelector((state: RootState) => state.ui.isWaiting);

    useEffect(() => {
        if (!isWaiting)
            window.scrollTo({
                top: window.scrollY + window.innerHeight,
                behavior: 'smooth'
            });
    }, [isWaiting]);
    
    return (
        <>
            {isWaiting && <div className={classes['center']}>
                <div className="lds-dual-ring"></div>
            </div>}
        </>
)
};

export default WaitScreen;