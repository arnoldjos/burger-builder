import React from "react";

import cssStyles from "./Modal.module.scss";
import Backdrop from "../Backdrop/Backdrop";

const Modal = props => {
    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={cssStyles.Modal}
                style={{
                    transform: props.show
                        ? "translateY(0)"
                        : "translateY(-100vh)",
                    opacity: props.show ? "1" : "0"
                }}
            >
                {props.children}
            </div>
        </React.Fragment>
    );
};

export default React.memo(Modal);
