import { put } from 'redux-saga/effects';

import * as actions from '../actions';
import firebase from '../../config/firebase';

export function* initIngredientsSaga(action) {
	try {
		const db = firebase.firestore();
		const doc = yield db
			.collection('ingredients')
			.doc('initial')
			.get();
		const data = doc.data();
		const ingredients = {
			salad: data.salad,
			bacon: data.bacon,
			cheese: data.cheese,
			meat: data.meat
		};
		yield put(actions.setIngredients(ingredients));
	} catch (e) {
		yield put(actions.fetchIngredientsFailed());
	}
}
