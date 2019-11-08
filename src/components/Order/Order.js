import React from 'react';

import cssStyles from './Order.module.scss';

const Order = props => {
	const ingredients = [];

	for (let name in props.ingredients) {
		ingredients.push(
			<span
				key={name}
				style={{
					textTransform: 'capitalize',
					display: 'inline-block',
					margin: '0 8px',
					border: '1px solid #ccc'
				}}
			>
				{name}: {props.ingredients[name]}
			</span>
		);
	}

	return (
		<div className={cssStyles.Order}>
			<p>Ingredients: {ingredients}</p>
			<p>
				Price: <strong>USD {parseFloat(props.price).toFixed(2)}</strong>
			</p>
		</div>
	);
};

export default Order;
