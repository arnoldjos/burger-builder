import React from "react";

import cssStyles from "./Button.module.scss";

const Button = props => {
  return (
    <button
      className={[cssStyles.Button, cssStyles[props.btnType]].join(" ")}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default Button;
