import * as actionTypes from './actionTypes';

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
	return {
		type: actionTypes.INIT_INGREDIENTS
	};
};
