//Register
import { TEST_DISPATCH } from "./types";

//this is an action creator
//This will dispatch userdata to the reducer that takes the type TEST_DISPATCH
export const registerUser = userData => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
};
