import React from "react";

import "./Layout.scss";

const layout = props => (
  <React.Fragment>
    <div>Toolbar, SideDrawer, BackDrop</div>
    <main className="Layout">{props.children}</main>
  </React.Fragment>
);

export default layout;
