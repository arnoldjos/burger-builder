import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinued = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	render() {
		const { ingredients, purchased } = this.props;
		let summary = <Redirect to="/" />;

		if (ingredients) {
			const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
			summary = (
				<div>
					{purchasedRedirect}
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

		return summary;
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.burger.ingredients,
		purchased: state.order.purchased
	};
};

export default connect(mapStateToProps)(Checkout);
