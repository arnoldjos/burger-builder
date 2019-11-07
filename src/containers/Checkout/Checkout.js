import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinued = () => {
        this.props.history.replace("/checkout/contact-data");
    };

    render() {
        const { ingredients } = this.props;

        return (
            <div>
                <CheckoutSummary
                    ingredients={ingredients}
                    checkoutContinued={this.checkoutContinued}
                    checkoutCancelled={this.checkoutCancelledHandler}
                />
                <Route
                    path={`${this.props.match.path}/contact-data`}
                    component={ContactData}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    };
};

export default connect(mapStateToProps)(Checkout);
