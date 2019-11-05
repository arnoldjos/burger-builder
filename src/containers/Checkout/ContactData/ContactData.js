import React, { Component } from "react";
import firebase from "../../../config/firebase";

import cssStyles from "./ContactData.module.scss";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        },
        loading: false
    };

    orderHandler = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const db = firebase.firestore();
        db.collection("orders")
            .add({
                ingredients: this.props.ingredients,
                totalPrice: this.props.price,
                customer: {
                    name: "Arnold Joseph",
                    address: {
                        street: "Test Street",
                        zipCode: "6213",
                        country: "Philippines"
                    },
                    email: "test@test.com"
                },
                orderedDate: new Date()
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

    render() {
        let form = (
            <form>
                <input
                    className={cssStyles.Input}
                    type="text"
                    name="name"
                    placeholder="Your Name"
                />
                <input
                    className={cssStyles.Input}
                    type="email"
                    name="name"
                    placeholder="Your Email"
                />
                <input
                    className={cssStyles.Input}
                    type="text"
                    name="street"
                    placeholder="Street"
                />
                <input
                    className={cssStyles.Input}
                    type="text"
                    name="postal"
                    placeholder="Postal Code"
                />
                <Button btnType="Success" clicked={this.orderHandler}>
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
