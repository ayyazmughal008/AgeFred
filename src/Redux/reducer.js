import { combineReducers } from "redux";
import {
  LOGIN_DETAIL,
  AUTH_LOADING,
  LOG_OUT,
  DATA_PART
} from "./action";

const initialUserState = {
  login: "",
  AuthLoading: false,
  dataPart: ""
};

const userReducer = (state = initialUserState, action) => {

  if (action.type === LOG_OUT) {
    return {
      ...state,
      login: '',
      AuthLoading: false,
      dataPart: ""
    };
  }

  if (action.type === AUTH_LOADING) {
    return {
      ...state,
      AuthLoading: action.payload
    };
  }
  if (action.type === LOGIN_DETAIL) {
    return {
      ...state,
      login: action.payload.login
    };
  }
  if (action.type === DATA_PART) {
    return {
      ...state,
      dataPart: action.payload.dataPart
    };
  }
  return state;
};

const reducer = combineReducers({
  user: userReducer
});
export default reducer;