import { delay } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/';

export function* logoutSaga(action) {
	yield call([localStorage, 'removeItem'], 'token');
	yield call([localStorage, 'removeItem'], 'expirationDate');
	yield call([localStorage, 'removeItem'], 'userId');
	yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expirationTime * 1000);
	yield put(actions.logout());
}

export function* authUserSaga(action) {
	yield put(actions.authStart());
	const { payload } = action;
	const data = {
		email: payload.email,
		password: payload.password,
		returnSecureToken: true
	};

	let url = payload.isSignUp
		? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD2cA7ewxbcxX0UWJF6gFdnkmCHRbIhqdU'
		: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD2cA7ewxbcxX0UWJF6gFdnkmCHRbIhqdU';

	try {
		const res = yield axios.post(url, data);
		console.log(res);
		const expirationDate = new Date(
			new Date().getTime() + res.data.expiresIn * 1000
		);
		const token = res.data.idToken;
		const userId = res.data.localId;
		yield localStorage.setItem('token', token);
		yield localStorage.setItem('expirationDate', expirationDate);
		yield localStorage.setItem('userId', userId);
		yield put(actions.authSuccess(token, userId));
		yield put(actions.checkAuthTimeout(res.data.expiresIn));
	} catch (e) {
		yield put(actions.authFail(e.response.data.error.message));
	}
}

export function* authCheckstateSaga(action) {
	const token = yield localStorage.getItem('token');
	if (!token) {
		yield put(actions.logout());
	} else {
		const expirationDate = yield new Date(
			localStorage.getItem('expirationDate')
		);
		if (expirationDate <= new Date()) {
			yield put(actions.logout());
		} else {
			const userId = yield localStorage.getItem('userId');
			yield put(actions.authSuccess(token, userId));
			yield put(
				actions.checkAuthTimeout(
					(expirationDate.getTime() - new Date().getTime()) / 1000
				)
			);
		}
	}
}
