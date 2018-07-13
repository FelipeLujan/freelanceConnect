import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validation/isEmpty";
const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        //isAuthenticated depends on whether action.payload is empty por not
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
