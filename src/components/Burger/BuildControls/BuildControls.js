import React from "react";

import cssStyles from "./BuildControls.module.scss";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" }
];

const BuildControls = props => {
    return (
        <div className={cssStyles.BuildControls}>
            <p>
                Current Price: <strong>{props.price.toFixed(2)}</strong>{" "}
            </p>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.addIngredient(ctrl.type)}
                    removed={() => props.removeIngredient(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            ))}
            <button
                className={cssStyles.OrderButton}
                disabled={!props.purchaseable}
                onClick={props.ordered}
            >
                {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
            </button>
        </div>
    );
};

export default BuildControls;
