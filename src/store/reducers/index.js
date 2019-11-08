import { combineReducers } from "redux";

import burgerBuilder from "./burgerBuilder";
import order from "./order";
import auth from "./auth";

const rootReducer = combineReducers({ burger: burgerBuilder, order, auth });

export default rootReducer;
