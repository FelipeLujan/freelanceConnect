//REDUX
import { applyMiddleware, createStore, compose } from "redux";

//redux -thunk
import thunk from "redux-thunk";

//Reducers
import rootReducer from "./reducers"; //index.js is called automatically from ./reducers

const middleware = [thunk];

//initial state is empty
const initialState = {};

//createStore()  =  [reducer],{initialState}, middleware()
const store = createStore(
  rootReducer,
  initialState,
  compose(
    //compose takes in the normal middleware and the redux devtools implementation
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
