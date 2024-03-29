import React from "react";

import cssStyles from "./NavigationItems.module.scss";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = props => {
    return (
        <ul className={cssStyles.NavigationItems}>
            <NavigationItem link="/" exact>
                Burger Builder
            </NavigationItem>
            {props.isAuth ? (
                <NavigationItem link="/orders">Orders</NavigationItem>
            ) : null}
            {props.isAuth ? (
                <NavigationItem link="/logout">Logout</NavigationItem>
            ) : (
                <NavigationItem link="/auth">Authenticate</NavigationItem>
            )}
        </ul>
    );
};

export default NavigationItems;
