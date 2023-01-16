import classes from './Navbar.module.css';
import Link from "next/link";
import Image from 'next/image';
import favicon from '../../public/favicon.ico'
import React from "react";

const Navbar: React.FC = _ => {
    return (
        <nav>
            <div className={classes.navbar}>
                <div className={classes.brand}>
                    <Image src={favicon} alt={'Logo'} width={100} height={100} />
                    <p>Ankimate</p>
                </div>
                <div className={classes.options}>
                    <Link href={'/ankiauto'}>Add Cards</Link>
                    <Link href={'/user'}>Stats</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;