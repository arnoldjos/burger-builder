import { put } from 'redux-saga/effects';

import * as actions from '../actions';
import firebase from '../../config/firebase';

export function* purchaseBurgerSaga(action) {
	const { orderData } = action.payload;
	try {
		const db = yield firebase.firestore();
		const doc = yield db.collection('orders').add(orderData);
		yield put(actions.purchaseBurgerStart());
		yield put(actions.purchaseBurgerSuccess(doc.id, orderData));
	} catch (e) {
		yield put(actions.purchaseBurgerFail(e));
	}
}

export function* fetchOrdersSaga(action) {
	const { userId } = action.payload;
	console.log(userId);
	try {
		yield put(actions.fetchOrdersStart());
		const db = yield firebase.firestore();
		let orders = [];
		const snapShot = yield db
			.collection('orders')
			.where('userId', '==', userId)
			.get();
		console.log(snapShot);
		snapShot.forEach(doc => {
			orders.push({
				id: doc.id,
				...doc.data()
			});
		});
		yield put(actions.fetchOrdersSuccess(orders));
	} catch (e) {
		yield put(actions.fetchOrdersFail(e));
	}
}
