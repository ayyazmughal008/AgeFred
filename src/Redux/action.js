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

var baseUrl = "http://95.179.209.186/api/",
  part_store = 'part-store',
  data_part = 'data-part',
  login = "login-employ",
  blog = "blogs-get",
  getPart = "parts-get",
  dataExpense = "data-expense",
  expenseStore = "expense-store",
  getExpensese = "expenses-get",
  documents = "documents-get";

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
          NavigationService.navigate('Home')
        } else {
          alert(json.message)
        }
      });
  };
}

export const fetchDataPart = () => {
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
  employId
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
  employId
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
              getAllPart: json
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
  employId
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    console.log("My array => ",imagesArray)
    const body = new FormData();
    body.append('date', date);
    body.append('draft', draft);
    body.append('reason', reason);
    body.append('amount', amount);
    body.append('madeDate', madeDate);
    body.append('employId', employId);
    imagesArray.forEach((item, i) => {
      body.append("images[]", {
        'uri': item.uri,
        'type': item.type,
        'name': item.name,
      });
    });
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
          alert(json.status)
        } else {
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