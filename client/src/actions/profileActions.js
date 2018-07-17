import axios from "axios";
import { CLEAR_CURRENT_PROFILE, GET_PROFILE, PROFILE_LOADING } from "./types";

//get current profile
export const getCurrentProfile = () => dispatch => {
  //
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      //if no profile is found, that means the user is already registered but hasnt
      //created a profile yet. so if the profile is an empty object, the user will
      //be prompted to create a profile.
      //not getting a profile is not an error then, that's why the GET_ERRORS actions type
      // is not being used.
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

//profile loading
export const setProfileLoading = () => {
  return {
    //setProfileLoading action is called as soon as the user tries to log in
    // this method dispatches the PROFILE_LOADING reducer, which turns loading to true,
    //when the axios gets the profile, the GET_PROFILE action is dispatched.
    //which sets loading to false (and populates profile state)
    type: PROFILE_LOADING
  };
};

//clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
