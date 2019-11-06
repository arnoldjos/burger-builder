import React from "react";

import cssStyles from "./Input.module.scss";

const Input = props => {
    let inputElement = null;
    const inputClasses = [cssStyles.InputElement];

    let validationError = null;
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(cssStyles.Invalid);
        validationError = (
            <p className={cssStyles.ValidationError}>
                Please enter a valid value!
            </p>
        );
    }

    switch (props.elementType) {
        case "input":
            inputElement = (
                <input
                    className={inputClasses.join(" ")}
                    value={props.value}
                    onChange={props.changed}
                    {...props.elementConfig}
                />
            );
            break;
        case "textarea":
            inputElement = (
                <textarea
                    className={inputClasses.join(" ")}
                    value={props.value}
                    onChange={props.changed}
                    {...props.elementConfig}
                />
            );
            break;
        case "select":
            inputElement = (
                <select
                    className={inputClasses.join(" ")}
                    value={props.value}
                    onChange={props.changed}
                    {...props.elementConfig}
                >
                    {props.elementConfig.options.map(option => (
                        <option value={option.value} key={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    className={cssStyles.InputElement}
                    value={props.value}
                    {...props.elementConfig}
                />
            );
            break;
    }

    return (
        <div className={cssStyles.Input}>
            <label className={cssStyles.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default Input;
