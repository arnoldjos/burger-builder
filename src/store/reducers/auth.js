import * as actionTypes from "../actions/actionTypes";
import { fromJS } from "immutable";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/"
};

const authReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case actionTypes.AUTH_START:
            return fromJS(state)
                .set("error", null)
                .set("loading", true)
                .toJS();
        case actionTypes.AUTH_SUCCESS:
            return fromJS(state)
                .set("error", null)
                .set("loading", false)
                .set("token", payload.token)
                .set("userId", payload.userId)
                .toJS();
        case actionTypes.AUTH_FAIL:
            return fromJS(state)
                .set("error", payload.error)
                .set("loading", false)
                .toJS();
        case actionTypes.AUTH_LOGOUT:
            return fromJS(state)
                .set("token", null)
                .set("userId", null)
                .toJS();
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return fromJS(state)
                .set("authRedirectPath", payload.path)
                .toJS();
        default:
            return state;
    }
};

export default authReducer;
