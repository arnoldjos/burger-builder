import React from "react";

import cssStyles from "./Order.module.scss";

const Order = props => (
    <div className={cssStyles.Order}>
        <p>
            Price: <strong>{props.order.totalPrice}</strong>
        </p>
    </div>
);

export default Order;
