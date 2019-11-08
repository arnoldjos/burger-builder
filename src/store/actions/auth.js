import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token,
            userId
        }
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        payload: {
            error
        }
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = expiration => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiration * 1000);
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        const data = {
            email,
            password,
            returnSecureToken: true
        };

        let url = isSignUp
            ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD2cA7ewxbcxX0UWJF6gFdnkmCHRbIhqdU"
            : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD2cA7ewxbcxX0UWJF6gFdnkmCHRbIhqdU";

        dispatch(authStart());
        axios
            .post(url, data)
            .then(res => {
                const expirationDate = new Date(
                    new Date().getTime() + res.data.expiresIn * 1000
                );
                const token = res.data.idToken;
                const userId = res.data.localId;
                localStorage.setItem("token", token);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("userId", userId);
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(e => {
                console.log(e);
                dispatch(authFail(e.response.data.error.message));
            });
    };
};

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        payload: {
            path
        }
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem("expirationDate")
            );
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(token, userId));
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            }
        }
    };
};
