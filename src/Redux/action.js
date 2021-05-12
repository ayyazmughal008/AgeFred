import NavigationService from '../navigator/navigationService'
import Toast from 'react-native-simple-toast';
import { Alert } from 'react-native'
export const LOGIN_DETAIL = "LOAD_HOMEPAGE";
export const AUTH_LOADING = "AUTH_LOADING";
export const DATA_PART = "DATA_PART";
export const LOG_OUT = "LOG_OUT";
export const DOWNLOAD = "DOWNLOAD";
export const PERSONAL_DOWNLOAD = "PERSONAL_DOWNLOAD";
export const GET_PART = "GET_PART";
export const BLOGS = "BLOGS";
export const DATA_EXPENSE = "DATA_EXPENSE";
export const GET_EXPENSE = "GET_EXPENSE";
export const POST_PART_STORE = "POST_PART_STORE";
export const DATA_HOLIDAYS = "DATA_HOLIDAYS";
export const GET_HOLIDAYS = "GET_HOLIDAYS";
export const API_STATUS = "API_STATUS";
export const GET_TOOLS = "GET_TOOLS";
export const ORDER_NUMBER = "ORDER_NUMBER";
export const START_TIME = "START_TIME";
export const STOP_TIME = "STOP_TIME";
export const TIMER_STATUS = "TIMER_STATUS";
export const TIME_TRACKING = "TIME_TRACKING";
export const TRACKING_HISTORY = "TRACKING_HISTORY";
export const GDPR = "GDPR";
export const EPIS_HISTORY = "EPIS_HISTORY";
export const EPIS2_DATA = "EPIS2_DATA";
export const PROJECT_DETAIL = "PROJECT_DETAIL";
export const CLEAR_CACHE = "CLEAR_CACHE";
export const COUNTER = "COUNTER";
export const FCM_TOKKEN = "FCM_TOKKEN";
export const EPIS_APEAL = "EPIS_APEAL";

var baseUrl = "http://95.179.209.186/api/",
  part_store = 'part-store',
  data_part = 'data-part',
  login = "login-employ",
  blog = "blogs-get",
  getPart = "parts-get",
  getTime = "times-get",
  timesEnd = "times-end",
  timesStart = "times-start",
  timesSubmit = "times-submit",
  dataExpense = "data-expense",
  timesHistory = "times-history",
  gdprGet = "gdpr-get",
  epiHistory = "epi-history",
  gdprSubmit = "gdpr-submit",
  toolsGet2 = "tools-get2",
  epi2Submit = "epi2-submit",
  epi1Submit = "epi1-submit",
  expenseStore = "expense-store",
  getExpensese = "expenses-get",
  dataHoliday = "data-holiday",
  getholidays = 'holidays-get',
  holidayStore = "holiday-store",
  user = "user",
  logout = "logout",
  userDownloaded = "userDownloaded",
  mobGetInterval = "mobGetInterval",
  changePassword = "changePassword",
  orderNumber = "order-number",
  workStore = "work-store",
  getTools = "epi-getAllEpis",
  submitEpis1 = 'epi-submitCondition',
  projectAuto = "project-auto",
  partsDelete = "parts-delete",
  episApealData = 'epi-getAppealData',
  submitApealEpis = 'epi-submitAppeal',
  updatePassword = 'password-submitForget',
  getPersonalDocument = 'documents-personal-get',
  documents = "documents-get";

export const getFcmToken = (value) => {
  return dispatch => {
    dispatch({ type: FCM_TOKKEN, payload: value })
  }
}
export const timeStatus = (value) => {
  return dispatch => {
    dispatch({ type: TIMER_STATUS, payload: value })
  }
}
export const stopTime = (time) => {
  return dispatch => {
    dispatch({ type: STOP_TIME, payload: time })
  }
}
export const startTime = (time) => {
  return dispatch => {
    dispatch({ type: START_TIME, payload: time })
  }
}
export const logOut = () => {
  return dispatch => {
    dispatch({ type: LOG_OUT })
  }
}
export const clearCache = () => {
  return dispatch => {
    dispatch({ type: CLEAR_CACHE })
  }
}
export const fetchLoginDetail = (dni, password, fcm) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + login, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dni: dni,
        password: password,
        fcm: fcm
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: LOGIN_DETAIL,
            payload: {
              login: json
            }
          });
          // dispatch(getGDPRDocument(json.data.id))
          //NavigationService.navigate('ChangePassword')
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const fetchDataPart = (id) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + data_part, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: DATA_PART,
            payload: {
              dataPart: json
            }
          });
          dispatch(getAllTime(id));
          dispatch(getGDPRDocument(id))
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const postPartStoreData = (
  date,
  project,
  hourType,
  hours,
  concept,
  employId,
  list
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    console.log(
      "My data",
      date,
      project,
      hourType,
      hours,
      concept,
      employId)
    fetch(baseUrl + part_store, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: date,
        project: project,
        hourType: hourType,
        hours: hours,
        concept: concept,
        employId: employId
      }),
    })
      .then(res => res.json())
      .then(json => {
        // //console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch(getAllParts(null, null, employId, list))
          Toast.show(json.message, Toast.LONG, [
            'UIAlertController',
          ]);
        } else {
          Alert.alert("", json.message)
        }
      }).catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const getAllParts = (
  from,
  to,
  employId,
  list
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + getPart, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: from,
        to: to,
        employId: employId
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: GET_PART,
            payload: {
              getAllPart: json,
              getAllPartSelection: json.data.map(item => {
                item.isSelect = false;
                item.selectedClass = list;
                return item;
              })
            }
          });
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const getDocuments = () => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + documents, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: DOWNLOAD,
            payload: {
              getDocuments: json
            }
          });
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const getBlogs = () => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + blog, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: BLOGS,
            payload: {
              getBlogs: json
            }
          });
        } else {
          Alert.alert("".json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const getExpense = () => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + dataExpense, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: DATA_EXPENSE,
            payload: {
              getDataExpense: json
            }
          });
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const postExpenseData = (
  date,
  draft,
  reason,
  amount,
  madeDate,
  imagesArray,
  singleImage,
  employId
) => {
  console.log("My Data ====>",
    date,
    draft,
    reason,
    amount,
    madeDate,
    imagesArray,
    singleImage,
    employId
  )
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    //console.log("My array => ", imagesArray)
    const body = new FormData();
    body.append('date', date);
    body.append('draft', draft);
    body.append('reason', reason);
    body.append('amount', amount);
    body.append('madeDate', madeDate);
    body.append('employId', employId);
    if (imagesArray === undefined || imagesArray.length === 0) {
      if (singleImage) {
        body.append('singleImage', singleImage);
      } else {
        body.append('singleImage', null);
      }
    } else {
      imagesArray.forEach((item, i) => {
        body.append("images[]", {
          'uri': item.uri,
          'type': item.type,
          'name': item.name,
        });
      });
    }
    fetch(baseUrl + expenseStore, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: body
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          Toast.show(json.message, Toast.LONG, [
            'UIAlertController',
          ]);
          dispatch({
            type: API_STATUS,
            payload: {
              apiStatus: json
            }
          });
        } else {
          //console.log(json)
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const getAllExpense = (
  from,
  to,
  employId
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + getExpensese, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: from,
        to: to,
        employId: employId
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: GET_EXPENSE,
            payload: {
              getAllExpense: json
            }
          });
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const getDataHolidays = () => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + dataHoliday, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        //console.log("my holiday data",json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: DATA_HOLIDAYS,
            payload: {
              getHolidaysData: json
            }
          });
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const postHolidayData = (
  type,
  reason,
  to,
  from,
  hours,
  employId
) => {
  console.log("my parameters===>",
    type,
    reason,
    to,
    from,
    hours,
    employId
  )
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + holidayStore, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
        reason: reason,
        to: from,
        from: to,
        hours: hours,
        employId: employId
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          Toast.show(json.message, Toast.LONG, [
            'UIAlertController',
          ]);
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const getHolidaysdata = (
  from,
  to,
  employId
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + getholidays, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: from,
        to: to,
        employId: employId
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log("my holiday data", json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: GET_HOLIDAYS,
            payload: {
              getAllHolidays: json
            }
          });
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const getOrderNumber = (
  employId
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + orderNumber, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employId: employId
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: ORDER_NUMBER,
            payload: {
              getWorkOrderNumber: json
            }
          });
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const postWorkStore = (
  number,
  draft,
  customerName,
  customerEmail,
  customerAddress,
  customerVat,
  customerPhone,
  reportDate,
  time,
  departureTime,
  workDetails,
  materials,
  hours,
  hourType,
  diet,
  displacement,
  workers,
  observations,
  job,
  image,
  employId
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    const body = new FormData();
    body.append('number', number);
    //new field//
    body.append('draft', draft);
    body.append('customerName', customerName);
    body.append('customerAddress', customerAddress);
    body.append('customerVat', customerVat);
    body.append('customerPhone', customerPhone);
    body.append('customerEmail', customerEmail);
    body.append('reportDate', reportDate);
    body.append('time', time);
    body.append('departureTime', departureTime);
    body.append('workDetails', workDetails);
    body.append('materials', materials);
    body.append('hours', hours);
    body.append('hourType', hourType);
    body.append('diet', diet);
    body.append('displacement', displacement);
    body.append('workers', workers);
    body.append('observations', observations);
    body.append('job', job);
    //new field//
    body.append('image', image);
    body.append('employId', employId);
    fetch(baseUrl + workStore, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: body
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          Toast.show(json.message, Toast.LONG, [
            'UIAlertController',
          ]);
          NavigationService.navigate('Home')
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(err => {
        dispatch({ type: AUTH_LOADING, payload: false });
        //console.log(err)
      })
  };
}
export const getAllTools = (
  employRoleId,
  id,
  isHome
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + getTools, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //employRoleId: employRoleId,
        userId: id
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: GET_TOOLS,
            payload: {
              getToolType: json
            }
          });
          NavigationService.navigate('Option1', {
            isHome: isHome
          })
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const postEpis1 = (
  option,
  id,
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + submitEpis1, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        option: option,
        userId: id
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          if (option === 'yes') {
            dispatch(getEpisApealData(id))
            NavigationService.navigate('Option2')
            //dispatch(getAllUsers(id))
          } else {
            dispatch(getAllUsers(id, 'no'))
          }

        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const deleteDailyPart = (
  ides,
  employId,
  to,
  from
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + partsDelete, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employId: employId,
        ides: ides,
        to: to,
        from: from
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: GET_PART,
            payload: {
              getAllPart: json
            }
          });
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const getAllTime = (
  employId,
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + getTime, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: employId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: TIME_TRACKING,
            payload: {
              timeTracking: json,
            }
          })
          if (!json.time) {
            dispatch(timeStatus(true))
            //console.log("first condition")
          } else if (!json.time.endTime) {
            dispatch(timeStatus(false))
            //console.log("second condition")
          } else {
            dispatch(timeStatus(true))
            //console.log("third condition")
          }
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const startTimeTracking = (
  lat,
  long,
  employId,
) => {
  console.log(
    "=========>",
    lat,
    long,
    employId)
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + timesStart, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: employId,
        lat: lat,
        lng: long
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log("Start time tracking data ==>>>", json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: TIME_TRACKING,
            payload: {
              timeTracking: json,
            }
          })
          if (!json.time) {
            dispatch(timeStatus(true))
            //console.log("first condition")
          } else if (!json.time.endTime) {
            dispatch(timeStatus(false))
            dispatch(getTimeCounter(json.time.id))
            //console.log("second condition")
          } else {
            dispatch(timeStatus(true))
            //console.log("third condition")
          }
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const endTimeTracking = (
  lat,
  long,
  employId,
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + timesEnd, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lat: lat,
        lng: long,
        id: employId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log("End time tracking data ==>>>", json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: TIME_TRACKING,
            payload: {
              timeTracking: json,
            }
          })
          if (!json.time) {
            dispatch(timeStatus(true))
            //console.log("first condition")
          } else if (!json.time.endTime) {
            dispatch(timeStatus(false))
            //console.log("second condition")
          } else {
            dispatch(timeStatus(true))
            dispatch(getTimeCounter(json.time.id))
            //console.log("third condition")
          }
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const submitTimeTracking = (
  start,
  end,
  lat,
  long,
  employId,
) => {
  console.log(
    start,
    end,
    lat,
    long,
    employId
  )
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + timesSubmit, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        start: start,
        end: end,
        id: employId,
        lat: lat,
        lng: long
      }),
    })
      .then(res => res.json())
      .then(json => {
        ////console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: TIME_TRACKING,
            payload: {
              timeTracking: json,
            }
          })
          if (!json.time) {
            dispatch(timeStatus(true))
            //console.log("first condition")
          } else if (!json.time.endTime) {
            dispatch(timeStatus(false))
            //console.log("second condition")
          } else {
            dispatch(timeStatus(true))
            //console.log("third condition")
          }
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const getTrackingHistory = (
  id,
  from,
  to
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + timesHistory, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        from: from,
        to: to
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: TRACKING_HISTORY,
            payload: {
              trackingHistory: json,
            }
          })
        } else {
          Alert.alert(json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const getGDPRDocument = (
  employId,
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + gdprGet, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: employId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log("get gdpr", json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: GDPR,
            payload: {
              getGdpr: json,
            }
          })
          // NavigationService.navigate('Home')
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const submitGDPRDocument = (
  employId,
  docId
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + gdprSubmit, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: employId,
        docId: docId,
        answer: "accept"
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log("post gdpr", json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: GDPR,
            payload: {
              getGdpr: json,
            }
          })
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const getEpisHistory = (
  employId,
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + epiHistory, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: employId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log("epi data", json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: EPIS_HISTORY,
            payload: {
              episHistory: json,
            }
          })
          NavigationService.navigate('Option3')
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const getEpisData2 = (
  employId,
  id
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + toolsGet2, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employRoleId: employId,
        id: id
      }),
    })
      .then(res => res.json())
      .then(json => {
        ////console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: EPIS2_DATA,
            payload: {
              episData2: json,
            }
          })
          NavigationService.navigate('Option2')
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const submitEpisData2 = (
  employId,
  data
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + epi2Submit, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: employId,
        data: data
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          alert("Data submit successfully")
          NavigationService.navigate('Epis')
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const submitEpisData1 = (
  employId,
  data,
  roleId
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + epi1Submit, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: employId,
        data: data,
        employRoleId: roleId
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          Alert.alert("", "Data submit successfully")
          dispatch(getAllUsers(employId))
          // NavigationService.navigate('Home')
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const getAutoProjectDetail = (
  name
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + projectAuto, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: PROJECT_DETAIL,
            payload: {
              projectDetail: json,
            }
          })
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const getAllUsers = (
  id,
  isHome
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + user, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: LOGIN_DETAIL,
            payload: {
              login: json
            }
          });
          if (json.condition !== false) {
            if (isHome === "yes") {
              dispatch(fetchDataPart(id))
            } else {
              dispatch(fetchDataPart(id))
              NavigationService.navigate('Home')
            }
          }
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const changeUserPass = (
  id,
  newPass,
  confirm
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + changePassword, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        new: newPass,
        confirm: confirm
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: LOGIN_DETAIL,
            payload: {
              login: json
            }
          });
          NavigationService.navigate('Home')
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const getTimeCounter = (
  id,
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + mobGetInterval, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: COUNTER,
            payload: {
              counter: json
            }
          });
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const postDownloadStatus = (
  userId,
  documentId
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + userDownloaded, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        documentId: documentId
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {

        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const logoutNotify = (
  id
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + logout, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {

        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const getEpisApealData = (
  id
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + episApealData, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: id
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        dispatch({
          type: EPIS_APEAL,
          payload: {
            getEpisApeal: json
          }
        });
        dispatch(getAllUsers(id, 'yes'))
        // if (json.status === "Success") {

        // } else {
        //   alert(json.message)
        // }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const postEpisApeal = (
  userId,
  epiArray,
  reason,
  size,
  comment,
  imagesArray,
  singleImage,
) => {
  // console.log("My epis Data ====>",
  //   userId,
  //   epiArray,
  //   reason,
  //   size,
  //   comment,
  //   imagesArray,
  //   singleImage,
  // )
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    //console.log("My array => ", imagesArray)
    const body = new FormData();
    body.append('userId', userId);
    body.append('epiArray', epiArray);
    body.append('reason', reason);
    body.append('size', size);
    body.append('comment', comment);
    if (imagesArray === undefined || imagesArray.length === 0) {
      if (singleImage) {
        body.append('images[]', singleImage);
      } else {
        body.append('images[]', null);
      }
    } else {
      imagesArray.forEach((item, i) => {
        body.append("images[]", {
          'uri': item.uri,
          'type': item.type,
          'name': item.name,
        });
      });
    }
    fetch(baseUrl + submitApealEpis, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: body
    })
      .then(res => res.json())
      .then(json => {
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          console.log(json)
          // Toast.show(json.message, Toast.LONG, [
          //   'UIAlertController',
          // ]);
          Alert.alert(json.message)
        } else {
          console.log(json)
          Alert.alert(json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}
export const getPersonalDoc = (id) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + getPersonalDocument, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: id
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: PERSONAL_DOWNLOAD,
            payload: {
              getPersonal: json
            }
          });
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}

export const updateForgetPass = (
  dni,
  number,
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + updatePassword, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dni: dni,
        email: number,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          Toast.show(json.message, Toast.LONG, [
            'UIAlertController',
          ]);
          NavigationService.navigate('Login')
        } else {
          Alert.alert("", json.message)
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: AUTH_LOADING, payload: false });
      })
  };
}