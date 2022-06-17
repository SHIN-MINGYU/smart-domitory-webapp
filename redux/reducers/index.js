import { combineReducers } from "redux";
import API from "./url";
import User from "./user";
const rootReducer = combineReducers({ API, User });

export default rootReducer;
