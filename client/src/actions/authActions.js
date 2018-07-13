// import library
import axios from "axios";

//import types
import { GET_ERRORS } from "./types";

//this is an action creator
//This will dispatch userdata to the reducer that takes the type TEST_DISPATCH
export const registerUser = userData => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => console.log(res.data))
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
