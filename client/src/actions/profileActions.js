//libraries
import axios from "axios";

//React-redux actions
import {
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  GET_PROFILE,
  PROFILE_LOADING,
  SET_CURRENT_USER
} from "./types";

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

//Delete user and all its profile
export const deleteAccount = () => dispatch => {
  if (
    window.confirm(
      "Are your sure you want to delete your profile? This CANNOT be undone!"
    )
  ) {
    axios
      .delete("/api/profile/")
      .then(res =>
        //after sending the delete request, the current user is set to and empty object, meaning the  user is log out
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }

  axios.delete("/api/profile/");
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

// create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    //if i put history.push("/dashboard") alone, both the .then() and .catch() will be executed
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post("/api/profile/education", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//delete experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//delete education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
