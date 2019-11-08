import * as actionTypes from "../actions/actionTypes";
import { fromJS } from "immutable";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 0.5,
    meat: 1.5,
    bacon: 0.8
};

const burgerReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return fromJS(state)
                .updateIn(["ingredients", payload.ingredient], val => val + 1)
                .update(
                    "totalPrice",
                    val => val + INGREDIENT_PRICES[payload.ingredient]
                )
                .set("building", true)
                .toJS();
        case actionTypes.REMOVE_INGREDIENT:
            return fromJS(state)
                .updateIn(["ingredients", payload.ingredient], val => val - 1)
                .update(
                    "totalPrice",
                    val => val - INGREDIENT_PRICES[payload.ingredient]
                )
                .toJS();
        case actionTypes.SET_INGREDIENTS:
            return fromJS(state)
                .set("ingredients", payload.ingredients)
                .set("totalPrice", 4)
                .set("building", false)
                .toJS();
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fromJS(state)
                .set("error", payload.error)
                .toJS();
        default:
            return state;
    }
};

export default burgerReducer;
