import {
  CLEAR_CURRENT_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING
} from "../actions/type";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

/*in the action: axios is going to hit the API, depending on the response, a different
* action is going to be triggered.
* That action is going to fall into any reducer.*/
