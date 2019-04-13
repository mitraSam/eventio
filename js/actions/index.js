import {
  setServerError,
  setApiError,
  setCurrentUser,
  setEvents,
  updateEventInEvents,
  addEventToEvents
} from "./actionCreators";
import {
  postData,
  setUserToken,
  getUserFromToken,
  apiErroMessages,
  getData,
  getUserToken,
  deleteData,
  removeUserToken
} from "../Utils";

export const clearErrors = () => dispatch => {
  dispatch(setServerError(false));
  dispatch(setApiError(""));
};

export const doAuthentication = (data, history, type) => dispatch => {
  const param = type === "create" ? "users" : "auth/native";
  postData(param, data)
    .then(res => {
      setUserToken(res.headers.authorization);
      dispatch(setCurrentUser(getUserFromToken()));
      if (history) history.push("/events");
    })
    .catch(handleError(dispatch));
};

const handleError = dispatch => err => {
  const { response } = err;
  if (!response) {
    dispatch(setServerError(true));
  }
  const { error } = response.data;
  if (apiErroMessages[error]) {
    dispatch(setApiError(apiErroMessages[error]));
  } else {
    dispatch(setApiError(error));
  }
};

export const loadEvents = () => dispatch => {
  getData("events")
    .then(({ data }) => dispatch(setEvents(data)))
    .catch(handleError(dispatch));
};

export const joinEvent = param => dispatch => {
  const token = getUserToken();
  postData(param, {}, token)
    .then(({ data }) => dispatch(updateEventInEvents(data)))
    .catch(handleError(dispatch));
};

export const leaveEvent = param => dispatch => {
  const token = getUserToken();
  deleteData(param, token)
    .then(({ data }) => {
      dispatch(updateEventInEvents(data));
    })
    .catch(handleError(dispatch));
};

export const addEvent = data => dispatch => {
  const token = getUserToken();

  postData("events", data, token)
    .then(({ data }) => {
      dispatch(addEventToEvents(data));
    })
    .catch(handleAddEventError(dispatch));
};

export const logUserOut = () => dispatch => {
  removeUserToken();
  dispatch(setCurrentUser({}));
};

export const handleAddEventError = dispatch => err => {
  const { response } = err;
  const fields = ["startsAt", "title", "description"];
  if (!response) return dispatch(setServerError(true));
  const { errors } = response.data;
  if (Array.isArray(errors)) return dispatch(setApiError(errors[0].message));

  fields.forEach(field => {
    if (field in errors) return dispatch(setApiError(errors[field].message));
  });
};
