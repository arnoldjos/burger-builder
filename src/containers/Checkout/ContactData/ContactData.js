import React, { Component } from "react";
import { fromJS } from "immutable";

import firebase from "../../../config/firebase";
import cssStyles from "./ContactData.module.scss";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: "",
                label: "Name",
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your Email"
                },
                value: "",
                label: "Email",
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street"
                },
                value: "",
                label: "Street",
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "ZIP Code"
                },
                value: "",
                label: "ZIP Code",
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country"
                },
                value: "",
                label: "Country",
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" }
                    ]
                },
                value: "fastest",
                label: "Delivery Method",
                valid: true,
                validation: {}
            }
        },
        formIsValid: false,
        loading: false
    };

    orderHandler = event => {
        event.preventDefault();
        this.setState({ loading: true });

        const formData = {};
        for (let formEl in this.state.orderForm) {
            formData[formEl] = this.state.orderForm[formEl].value;
        }

        console.log(formData);

        const db = firebase.firestore();
        db.collection("orders")
            .add({
                ingredients: this.props.ingredients,
                totalPrice: this.props.price,
                orderedDate: new Date(),
                ...formData
            })
            .then(res => {
                this.setState({ loading: false });
                this.props.history.push("/");
            })
            .catch(e => {
                this.setState({ loading: false });
                console.log(e);
            });
    };

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdent) => {
        const { value } = event.target;
        const valid = this.checkValidity(
            value,
            this.state.orderForm[inputIdent].validation
        );
        const updatedOrderForm = fromJS(this.state.orderForm)
            .setIn([inputIdent, "value"], value)
            .setIn([inputIdent, "valid"], valid)
            .setIn([inputIdent, "touched"], true)
            .toJS();
        const formIsValid = this.checkFormValidity(updatedOrderForm);

        console.log(updatedOrderForm);

        this.setState({ orderForm: updatedOrderForm, formIsValid });
    };

    checkFormValidity = orderForm => {
        let formIsValid = true;
        for (let inputIdentifier in orderForm) {
            formIsValid = orderForm[inputIdentifier].valid && formIsValid;
        }
        return formIsValid;
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        const formElements = formElementsArray.map(formEl => (
            <Input
                elementType={formEl.config.elementType}
                elementConfig={formEl.config.elementConfig}
                value={formEl.config.value}
                label={formEl.config.label}
                key={formEl.id}
                changed={event => this.inputChangedHandler(event, formEl.id)}
                invalid={!formEl.config.valid}
                shouldValidate={formEl.config.validation}
                touched={formEl.config.touched}
            />
        ));

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements}
                <Button btnType="Success" disabled={!this.state.formIsValid}>
                    ORDER
                </Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={cssStyles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
