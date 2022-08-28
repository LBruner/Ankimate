import type {NextPage} from 'next';
import {useSelector} from "react-redux";
import {RootState} from "../store/StoreIndex";
import classes from './WaitScreen.module.css';

const WaitScreen: NextPage = () => {
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