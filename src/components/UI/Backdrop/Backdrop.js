import React from "react";

import cssStyles from "./Backdrop.module.scss";

const Backdrop = props =>
  props.show ? (
    <div className={cssStyles.Backdrop} onClick={props.clicked}></div>
  ) : null;

export default Backdrop;
