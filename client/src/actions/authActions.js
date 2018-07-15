// import library
import axios from "axios";
import jwt_decode from "jwt-decode";

//import types
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Import Utils
import setAuthToken from "../utils/setAuthToken";

//this is an action creator
//This will dispatch userdata to the reducer that takes the type TEST_DISPATCH
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    //currently res.data is the data sent by the back end
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  //setState cant be called from an action
  //since im using async data, the promise response must be handled through dispatch
  //when received
};

// login  -get user

export const loginUser = userData => dispatch => {
  axios
    .post("api/users/login", userData)
    .then(res => {
      //save to local storage
      const { token } = res.data;
      //set token to local storage (setItem only stores strings)
      localStorage.setItem("jwtToken", token);
      //set token to auth Header (with axios, axios manages the http requests)
      setAuthToken(token);
      //decode token to get user data (it contains, name, avatar...)
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set Logged in User to reducer
export const setCurrentUser = decoded => {
  //once the data has been decoded, dispatch to set current user
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//logout user
export const logoutUser = () => dispatch => {
  //delete local storage
  localStorage.removeItem("jwtToken");
  //remove auth header on future requests (axios)
  setAuthToken(false);
  //set current user to empty object {} and isAuthenticated to false
  dispatch(setCurrentUser({}));
};
