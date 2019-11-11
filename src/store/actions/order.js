import * as actionTypes from './actionTypes';

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
	return {
		type: actionTypes.PURCHASE_BURGER,
		payload: {
			orderData
		}
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

export const fetchOrders = userId => {
	return {
		type: actionTypes.FETCH_ORDERS,
		payload: {
			userId
		}
	};
};

// export const fetchOrders = token => {
//     return dispatch => {
//         const auth = `Bearer ${token}`;
//         dispatch(fetchOrdersStart());
//         axios
//             .get("orders", { headers: { Authorization: auth } })
//             .then(res => {
//                 const orders = res.data.documents.map(el => {
//                     return convertFirestoreData(el);
//                 });
//                 dispatch(fetchOrdersSuccess(orders));
//             })
//             .catch(e => dispatch(fetchOrdersFail(e)));
//     };
// };
