import React from "react";

import cssStyles from "./Logo.module.scss";
import burgerLogo from "../../assets/images/burger-logo.png";

const Logo = props => (
  <div className={cssStyles.Logo} style={{ height: props.height }}>
    <img src={burgerLogo} alt="BurgerBuilder" />
  </div>
);

export default Logo;
