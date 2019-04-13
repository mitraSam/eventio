import {
  SET_CURRENT_USER,
  SET_API_ERROR,
  SET_SERVER_ERROR,
  SET_EVENTS,
  UPDATE_EVENT_IN_EVENTS,
  ADD_EVENT_TO_EVENTS
} from "../Constants";
import {
  getUserFromToken,
  postData,
  removeUserToken,
  setUserToken,
  apiErroMessages,
  getData,
  getUserToken,
  deleteData
} from "../Utils";

export function setCurrentUser(userObj) {
  return { type: SET_CURRENT_USER, payload: userObj };
}
export function setServerError(error) {
  return { type: SET_SERVER_ERROR, payload: error };
}
export function setApiError(error) {
  return { type: SET_API_ERROR, payload: error };
}
export function setEvents(data) {
  return { type: SET_EVENTS, payload: data };
}
export function updateEventInEvents(updatedEvent) {
  return { type: UPDATE_EVENT_IN_EVENTS, payload: updatedEvent };
}
export function addEventToEvents(event) {
  return { type: ADD_EVENT_TO_EVENTS, payload: event };
}

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
