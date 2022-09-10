import {useSelector} from "react-redux";
import {RootState} from "../store/StoreIndex";
import classes from './WaitScreen.module.css';
import React from "react";

const WaitScreen: React.FC = () => {
    const isWaiting: boolean = useSelector((state: RootState) => state.ui.isWaiting);
    
    return (
        <>
            {isWaiting && <div className={classes['center']}>
                <div className="lds-dual-ring"></div>
            </div>}
        </>
)
};

export default WaitScreen;