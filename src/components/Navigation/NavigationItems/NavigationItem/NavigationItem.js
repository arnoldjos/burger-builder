import React from "react";
import { NavLink } from "react-router-dom";

import cssStyles from "./NavigationItem.module.scss";

const NavigationItem = props => {
    return (
        <li className={cssStyles.NavigationItem}>
            <NavLink
                exact={props.exact}
                activeClassName={cssStyles.active}
                to={props.link}
            >
                {props.children}
            </NavLink>
        </li>
    );
};

export default NavigationItem;
