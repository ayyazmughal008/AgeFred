export const LOAD_HOMEPAGE = "LOAD_HOMEPAGE";
export const AUTH_LOADING = "AUTH_LOADING";

var homeURL = "https://zamanaustralia.com/wp-json/wl/v1/posts/";

export function fetchHomePage() {
  return dispatch => {
    dispatch({ type: AUTH_LOADING, payload: true });
    fetch(homeURL)
      .then(res => res.json())
      .then(json => {
        //console.log(json.TopNews);
        dispatch({
          type: LOAD_HOMEPAGE,
          payload: {
            articles: json.TopNews
          }
        });
        dispatch({ type: AUTH_LOADING, payload: false });
      });
  };
}