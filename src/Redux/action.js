import NavigationService from '../navigator/navigationService'
export const LOGIN_DETAIL = "LOAD_HOMEPAGE";
export const AUTH_LOADING = "AUTH_LOADING";
export const DATA_PART = "DATA_PART";
export const LOG_OUT = "LOG_OUT";
export const DOWNLOAD = "DOWNLOAD";
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
  orderNumber = "order-number",
  workStore = "work-store",
  getTools = "tools-get",
  projectAuto = "project-auto",
  partsDelete = "parts-delete",
  documents = "documents-get";

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
export const fetchLoginDetail = (dni, password) => {
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
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: LOGIN_DETAIL,
            payload: {
              login: json
            }
          });
          // dispatch(getGDPRDocument(json.data.id))
          NavigationService.navigate('Home')
        } else {
          alert(json.message)
        }
      });
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
        console.log(json)
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
          alert(json.message)
        }
      });
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
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch(getAllParts(null, null, employId, list))
          alert(json.message)
        } else {
          alert(json.message)
        }
      });
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
        console.log(json)
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
          alert(json.message)
        }
      });
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
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: DOWNLOAD,
            payload: {
              getDocuments: json
            }
          });
        } else {
          alert(json.message)
        }
      });
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
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: BLOGS,
            payload: {
              getBlogs: json
            }
          });
        } else {
          alert(json.message)
        }
      });
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
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: DATA_EXPENSE,
            payload: {
              getDataExpense: json
            }
          });
        } else {
          alert(json.message)
        }
      });
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
    console.log("My array => ", imagesArray)
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
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          alert(json.status)
          dispatch({
            type: API_STATUS,
            payload: {
              apiStatus: json
            }
          });
        } else {
          console.log(json)
          alert(json.message)
        }
      })
      .catch(error => {
        dispatch({ type: AUTH_LOADING, payload: false });
        console.log('uploadImage error:', error);
      });
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
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: GET_EXPENSE,
            payload: {
              getAllExpense: json
            }
          });
        } else {
          alert(json.message)
        }
      });
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
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: DATA_HOLIDAYS,
            payload: {
              getHolidaysData: json
            }
          });
        } else {
          alert(json.message)
        }
      });
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
        to: to,
        from: from,
        hours: hours,
        employId: employId
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          alert(json.status)
        } else {
          alert(json.message)
        }
      });
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
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: GET_HOLIDAYS,
            payload: {
              getAllHolidays: json
            }
          });
        } else {
          alert(json.message)
        }
      });
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
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: ORDER_NUMBER,
            payload: {
              getWorkOrderNumber: json
            }
          });
        } else {
          alert(json.message)
        }
      });
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
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          alert(json.status)
          NavigationService.navigate('Home')
        } else {
          alert(json.message)
        }
      })
      .catch(err => {
        dispatch({ type: AUTH_LOADING, payload: false });
        console.log(err)
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
        employRoleId: employRoleId,
        id: id
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
          alert(json.message)
        }
      });
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
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: GET_PART,
            payload: {
              getAllPart: json
            }
          });
        } else {
          alert(json.message)
        }
      });
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
        console.log(json)
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
            console.log("first condition")
          } else if (!json.time.endTime) {
            dispatch(timeStatus(false))
            console.log("second condition")
          } else {
            dispatch(timeStatus(true))
            console.log("third condition")
          }
        } else {
          alert(json.message)
        }
      });
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
            console.log("first condition")
          } else if (!json.time.endTime) {
            dispatch(timeStatus(false))
            console.log("second condition")
          } else {
            dispatch(timeStatus(true))
            console.log("third condition")
          }
        } else {
          alert(json.message)
        }
      });
  };
}
export const endTimeTracking = (
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
        id: employId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
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
            console.log("first condition")
          } else if (!json.time.endTime) {
            dispatch(timeStatus(false))
            console.log("second condition")
          } else {
            dispatch(timeStatus(true))
            console.log("third condition")
          }
        } else {
          alert(json.message)
        }
      });
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
            console.log("first condition")
          } else if (!json.time.endTime) {
            dispatch(timeStatus(false))
            console.log("second condition")
          } else {
            dispatch(timeStatus(true))
            console.log("third condition")
          }
        } else {
          alert(json.message)
        }
      });
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
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: TRACKING_HISTORY,
            payload: {
              trackingHistory: json,
            }
          })
        } else {
          alert(json.message)
        }
      });
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
        console.log(json)
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
          alert(json.message)
        }
      });
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
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: GDPR,
            payload: {
              getGdpr: json,
            }
          })
        } else {
          alert(json.message)
        }
      });
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
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: EPIS_HISTORY,
            payload: {
              episHistory: json,
            }
          })
        } else {
          alert(json.message)
        }
      });
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
        //console.log(json)
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
          alert(json.message)
        }
      });
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
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          alert("Data submit successfully")
          NavigationService.navigate('Epis')
        } else {
          alert(json.message)
        }
      });
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
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          alert("Data submit successfully")
          dispatch(getAllUsers(employId))
          // NavigationService.navigate('Home')
        } else {
          alert(json.message)
        }
      });
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
        console.log(json)
        dispatch({ type: AUTH_LOADING, payload: false });
        if (json.status === "Success") {
          dispatch({
            type: PROJECT_DETAIL,
            payload: {
              projectDetail: json,
            }
          })
        } else {
          alert(json.message)
        }
      });
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
        console.log(json)
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
          alert(json.message)
        }
      });
  };
}