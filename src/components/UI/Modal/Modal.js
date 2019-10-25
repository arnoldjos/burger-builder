import React from "react";

import cssStyles from "./Modal.module.scss";

const Modal = props => {
  return <div className={cssStyles.Modal}>{props.children}</div>;
};

export default Modal;
