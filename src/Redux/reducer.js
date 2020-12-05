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
  API_STATUS,
  GET_TOOLS,
  START_TIME,
  STOP_TIME,
  TIMER_STATUS,
  TIME_TRACKING,
  TRACKING_HISTORY,
  GDPR,
  EPIS_HISTORY,
  EPIS2_DATA,
  PROJECT_DETAIL
} from "./action";

const initialUserState = {
  login: "",
  AuthLoading: false,
  dataPart: "",
  getDocuments: "",
  getBlogs: "",
  getAllPart: "",
  getAllPartSelection: [],
  getDataExpense: "",
  getAllExpense: "",
  getHolidaysData: "",
  getAllHolidays: "",
  getWorkOrderNumber: "",
  apiStatus: "",
  getToolType: "",
  startTimer: "",
  stopTimer: "",
  timerStatus: true,
  timeTracking: "",
  trackingHistory: "",
  getGdpr: "",
  episHistory: "",
  episData2:"",
  projectDetail:""
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
      getAllPartSelection: [],
      getDataExpense: "",
      getAllExpense: "",
      getHolidaysData: "",
      getAllHolidays: "",
      getWorkOrderNumber: "",
      getToolType: "",
      startTimer: "",
      stopTimer: "",
      timerStatus: true,
      timeTracking: "",
      trackingHistory: "",
      getGdpr: "",
      episHistory: "",
      episData2:"",
      projectDetail:""
    };
  }
  if (action.type === TIMER_STATUS) {
    return {
      ...state,
      timerStatus: action.payload
    };
  }
  if (action.type === START_TIME) {
    return {
      ...state,
      startTimer: action.payload
    };
  }
  if (action.type === STOP_TIME) {
    return {
      ...state,
      stopTimer: action.payload
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
      getAllPart: action.payload.getAllPart,
      getAllPartSelection: action.payload.getAllPartSelection
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
  if (action.type === GET_TOOLS) {
    return {
      ...state,
      getToolType: action.payload.getToolType
    };
  }
  if (action.type === TIME_TRACKING) {
    return {
      ...state,
      timeTracking: action.payload.timeTracking
    };
  }
  if (action.type === TRACKING_HISTORY) {
    return {
      ...state,
      trackingHistory: action.payload.trackingHistory
    };
  }
  if (action.type === GDPR) {
    return {
      ...state,
      getGdpr: action.payload.getGdpr
    };
  }
  if (action.type === EPIS_HISTORY) {
    return {
      ...state,
      episHistory: action.payload.episHistory
    };
  } 
  if (action.type === EPIS2_DATA) {
    return {
      ...state,
      episData2: action.payload.episData2
    };
  }
  if (action.type === PROJECT_DETAIL) {
    return {
      ...state,
      projectDetail: action.payload.projectDetail
    };
  }
  return state;
};

const statusReducer = (state = initialUserState, action) => {
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