import React, {useEffect, useState} from "react";
import classes from './ScrollToTop.module.css'
import {RxDoubleArrowUp} from 'react-icons/rx';

const ScrollToTop: React.FC = _ => {
    const [showScroll, setShowScroll] = useState<boolean>(false);
    const onClickHandler = () =>{
        window.scrollTo()
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    
    useEffect(() => {
        const handleScroll = () => {
            setShowScroll(window.scrollY > 290)
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    
    if (!showScroll)
        return <></>
    return (
        <div onClick={onClickHandler} className={classes['button-box']}>
            <RxDoubleArrowUp className={classes.icon}/>
        </div>
    );
};

export default ScrollToTop;