import * as actionTypes from "./actions";
import { fromJS } from "immutable";

const initialState = {
    ingredients: {
        salad: 1,
        bacon: 1,
        cheese: 1,
        meat: 1
    },
    totalPrice: 4
};

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 0.5,
    meat: 1.5,
    bacon: 0.8
};

const rootReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return fromJS(state)
                .updateIn(["ingredients", payload.ingredient], val => val + 1)
                .update(
                    "totalPrice",
                    val => val + INGREDIENT_PRICES[payload.ingredient]
                )
                .toJS();
        case actionTypes.REMOVE_INGREDIENT:
            return fromJS(state)
                .updateIn(["ingredients", payload.ingredient], val => val - 1)
                .update(
                    "totalPrice",
                    val => val - INGREDIENT_PRICES[payload.ingredient]
                )
                .toJS();
        default:
            return state;
    }
};

export default rootReducer;
