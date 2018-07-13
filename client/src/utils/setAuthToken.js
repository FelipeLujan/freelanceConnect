import axios from "axios";
// set the auth token to every http request, with axios
const setAuthToken = token => {
  if (token) {
    //apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // do not include auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
