import React, { Component } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false
    };

    async componentDidMount() {
        // const db = firebase.firestore();
        // const initial = await db
        //     .collection("ingredients")
        //     .doc("initial")
        //     .get()
        //     .then(doc => doc.data());
        // this.setState({ ingredients: initial });
        // console.log(this.state.ingredients);
    }

    updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        console.log(sum);
        return sum > 0;
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.history.push("/checkout");
    };

    render() {
        const { ingredients, totalPrice } = this.props;

        const disabledInfo = {
            ...ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = <Spinner />;

        if (ingredients) {
            orderSummary = (
                <OrderSummary
                    ingredients={ingredients}
                    price={totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                />
            );
            burger = (
                <React.Fragment>
                    <Burger ingredients={ingredients} />
                    <BuildControls
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={totalPrice}
                        purchaseable={this.updatePurchaseState(ingredients)}
                        ordered={this.purchaseHandler}
                    />
                </React.Fragment>
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <React.Fragment>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingredient =>
            dispatch({
                type: actionTypes.ADD_INGREDIENT,
                payload: { ingredient }
            }),
        onIngredientRemoved: ingredient =>
            dispatch({
                type: actionTypes.REMOVE_INGREDIENT,
                payload: { ingredient }
            })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BurgerBuilder);
