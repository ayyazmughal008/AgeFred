import { combineReducers } from "redux";
import {
  LOGIN_DETAIL,
  AUTH_LOADING,
  LOG_OUT,
  DATA_PART,
  DOWNLOAD,
  BLOGS,
  GET_PART,
  DATA_EXPENSE,
  GET_EXPENSE,
  DATA_HOLIDAYS,
  GET_HOLIDAYS,
  ORDER_NUMBER,
  API_STATUS
} from "./action";

const initialUserState = {
  login: "",
  AuthLoading: false,
  dataPart: "",
  getDocuments: "",
  getBlogs: "",
  getAllPart: "",
  getDataExpense: "",
  getAllExpense: "",
  getHolidaysData: "",
  getAllHolidays: "",
  getWorkOrderNumber: "",
  apiStatus:""
};

const userReducer = (state = initialUserState, action) => {

  if (action.type === LOG_OUT) {
    return {
      ...state,
      login: "",
      AuthLoading: false,
      dataPart: "",
      getDocuments: "",
      getBlogs: "",
      getAllPart: "",
      getDataExpense: "",
      getAllExpense: "",
      getHolidaysData: "",
      getAllHolidays: "",
      getWorkOrderNumber: ""
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
  if (action.type === DOWNLOAD) {
    return {
      ...state,
      getDocuments: action.payload.getDocuments
    };
  }
  if (action.type === BLOGS) {
    return {
      ...state,
      getBlogs: action.payload.getBlogs
    };
  }
  if (action.type === GET_PART) {
    return {
      ...state,
      getAllPart: action.payload.getAllPart
    };
  }

  if (action.type === DATA_EXPENSE) {
    return {
      ...state,
      getDataExpense: action.payload.getDataExpense
    };
  }

  if (action.type === GET_EXPENSE) {
    return {
      ...state,
      getAllExpense: action.payload.getAllExpense
    };
  }
  if (action.type === DATA_HOLIDAYS) {
    return {
      ...state,
      getHolidaysData: action.payload.getHolidaysData
    };
  }
  if (action.type === GET_HOLIDAYS) {
    return {
      ...state,
      getAllHolidays: action.payload.getAllHolidays
    };
  }
  if (action.type === ORDER_NUMBER) {
    return {
      ...state,
      getWorkOrderNumber: action.payload.getWorkOrderNumber
    };
  }
  return state;
};

const statusReducer = (state = initialUserState, action) =>{
  if (action.type === API_STATUS) {
    return {
      ...state,
      apiStatus: action.payload.apiStatus
    };
  }
  return state;
}

const reducer = combineReducers({
  user: userReducer,
  apiState: statusReducer
});
export default reducer;