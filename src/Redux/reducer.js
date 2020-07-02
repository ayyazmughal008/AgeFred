import { combineReducers } from "redux";
import { LOAD_HOMEPAGE, AUTH_LOADING } from "./action";

const initialUserState = {
  myArray: [],
  AuthLoading: false
};

const userReducer = (state = initialUserState, action) => {
  if (action.type === AUTH_LOADING) {
    return {
      ...state,
      AuthLoading: action.payload
    };
  }
  if (action.type === LOAD_HOMEPAGE) {
    return {
      ...state,
      myArray: action.payload.articles
    };
  }
  return state;
};

const reducer = combineReducers({
  user: userReducer
});
export default reducer;