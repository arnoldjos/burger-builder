import * as actionTypes from "./actionTypes";
import firebase from "../../config/firebase";

export const addIngredient = name => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: {
            ingredient: name
        }
    };
};

export const removeIngredient = name => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: {
            ingredient: name
        }
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        payload: {
            error: false
        }
    };
};

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload: {
            ingredients
        }
    };
};

export const getIngredients = () => {
    return dispatch => {
        const db = firebase.firestore();
        db.collection("ingredients")
            .doc("initial")
            .get()
            .then(doc => {
                const data = doc.data();
                const ingredients = {
                    salad: data.salad,
                    bacon: data.bacon,
                    cheese: data.cheese,
                    meat: data.meat
                };
                dispatch(setIngredients(ingredients));
            })
            .catch(e => dispatch(fetchIngredientsFailed()));
    };
};
