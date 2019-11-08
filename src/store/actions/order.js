import * as actionTypes from './actionTypes';
import firebase from '../../config/firebase';

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		payload: {
			id,
			...orderData
		}
	};
};

export const purchaseBurgerFail = error => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		payload: {
			error
		}
	};
};

export const purchaseBurger = orderData => {
	return dispatch => {
		const db = firebase.firestore();
		console.log(orderData);
		db.collection('orders')
			.add(orderData)
			.then(doc => {
				dispatch(purchaseBurgerStart());
				dispatch(purchaseBurgerSuccess(doc.id, orderData));
			})
			.catch(e => dispatch(purchaseBurgerFail(e)));
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};

export const fetchOrdersSuccess = orders => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		payload: {
			orders
		}
	};
};

export const fetchOrdersFail = error => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		payload: {
			error
		}
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	};
};

export const fetchOrders = () => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		const db = firebase.firestore();
		db.collection('orders')
			.get()
			.then(querySnapshot => {
				const orders = [];
				querySnapshot.forEach(doc => {
					orders.push({
						id: doc.id,
						...doc.data()
					});
				});
				dispatch(fetchOrdersSuccess(orders));
			})
			.catch(e => dispatch(fetchOrdersFail(e)));
	};
};
