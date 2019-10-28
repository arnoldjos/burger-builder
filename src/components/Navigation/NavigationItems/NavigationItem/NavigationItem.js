import React from "react";

import cssStyles from "./NavigationItem.module.scss";
import classes from "./NavigationItem.module.scss";

const NavigationItem = props => {
  return (
    <li className={cssStyles.NavigationItem}>
      <a href={props.link} className={props.active ? classes.active : null}>
        {props.children}
      </a>
    </li>
  );
};

export default NavigationItem;
