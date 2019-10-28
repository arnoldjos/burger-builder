import React from "react";

import cssStyles from "./DrawerToggle.module.scss";

const DrawerToggle = props => {
  return (
    <div onClick={props.clicked} className={cssStyles.DrawerToggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DrawerToggle;
