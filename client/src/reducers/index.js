import { combineReducers } from "redux";
import authReducer from "./authReducer";

//reducers are going to be combined because there are going to be multiple reducers

//combineReducers() takes an object with the reducers
export default combineReducers({
  auth: authReducer
});
