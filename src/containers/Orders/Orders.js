import React, { Component } from 'react';
import { connect } from 'react-redux';

import firebase from '../../config/firebase';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import { fetchOrders } from '../../store/actions/';

class Orders extends Component {
	async componentDidMount() {
		this.props.onFetchOrder();
	}

	// loadData = () => {
	// 	const db = firebase.firestore();
	// 	db.collection('orders')
	// 		.get()
	// 		.then(querySnapshot => {
	// 			const items = [];
	// 			querySnapshot.forEach(doc => {
	// 				items.push({
	// 					id: doc.id,
	// 					...doc.data()
	// 				});
	// 			});
	// 			this.setState({ orders: items, loading: false });
	// 		});
	// };

	render() {
		let orders = <Spinner />;

		if (!this.props.loading) {
			orders = this.props.orders.map(order => (
				<Order
					ingredients={order.ingredients}
					price={order.totalPrice}
					key={order.id}
				/>
			));
		}

		return <div>{orders}</div>;
	}
}

const mapStateToProps = state => {
	return {
		loading: state.order.loading,
		orders: state.order.orders
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrder: () => dispatch(fetchOrders())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Orders);
