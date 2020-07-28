import NavigationService from '../navigator/navigationService'
export const LOGIN_DETAIL = "LOAD_HOMEPAGE";
export const AUTH_LOADING = "AUTH_LOADING";
export const DATA_PART = "DATA_PART";
export const LOG_OUT = "LOG_OUT";
export const POST_PART_STORE = "POST_PART_STORE";

var baseUrl = "http://95.179.209.186/api/",
  part_store = 'part-store',
  data_part = 'data-part',
  login = "login-employ";

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
  plus1,
  plus2,
  plus3,
  plus4,
  plus5,
  employId
) => {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
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
        plus1: plus1,
        plus2: plus2,
        plus3: plus3,
        plus4: plus4,
        plus5: plus5,
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