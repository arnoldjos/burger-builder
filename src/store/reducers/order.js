import * as actionTypes from '../actions/actionTypes';
import { fromJS } from 'immutable';

const initialState = {
	orders: [],
	loading: false,
	purchased: false
};

const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_INIT:
			return fromJS(state)
				.set('purchased', false)
				.toJS();
		case actionTypes.PURCHASE_BURGER_START:
			return fromJS(state)
				.set('loading', true)
				.toJS();
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			return fromJS(state)
				.update('orders', val => val.push(action.payload))
				.set('loading', false)
				.set('purchased', true)
				.toJS();
		case actionTypes.PURCHASE_BURGER_FAIL:
			return fromJS(state)
				.set('loading', false)
				.toJS();
		case actionTypes.FETCH_ORDERS_START:
			return fromJS(state)
				.set('loading', true)
				.toJS();
		case actionTypes.FETCH_ORDERS_SUCCESS:
			return fromJS(state)
				.set('orders', action.payload.orders)
				.set('loading', false)
				.toJS();
		case actionTypes.FETCH_ORDERS_FAIL:
			return fromJS(state)
				.set('loading', false)
				.toJS();
		default:
			return state;
	}
};

export default orderReducer;
