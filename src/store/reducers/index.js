import { combineReducers } from 'redux';

import burgerBuilder from './burgerBuilder';
import order from './order';

const rootReducer = combineReducers({ burger: burgerBuilder, order });

export default rootReducer;
