import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";

//reducers are going to be combined because there are going to be multiple reducers

//combineReducers() takes an object with the reducers
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
});
