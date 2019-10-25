import React from "react";

import cssClasses from "./Burger.module.scss";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(key => {
      return [...Array(props.ingredients[key])].map((_, i) => (
        <BurgerIngredient key={key + i} type={key} />
      ));
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Start Adding Ingredients</p>;
  }

  return (
    <div className={cssClasses.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
