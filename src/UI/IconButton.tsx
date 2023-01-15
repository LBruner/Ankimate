import * as React from "react";
import {ReactNode} from "react";

export type IconButton = {
    children: ReactNode
    onClick: () => void;
}

const IconButton: React.FC<IconButton> = ({children,onClick}) => {
    return (
        <div onClick={onClick}>
            {children}
        </div>
    );
};

export default IconButton;