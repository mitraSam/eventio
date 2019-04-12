import { combineReducers } from "redux";
import {
  SET_API_ERROR,
  SET_CURRENT_USER,
  SET_SERVER_ERROR,
  SET_EVENTS,
  UPDATE_EVENT_IN_EVENTS,
  ADD_EVENT_TO_EVENTS
} from "../Constants";

const currentUser = (state = {}, action) => {
  if (action.type === SET_CURRENT_USER) {
    return action.payload;
  }
  return state;
};

const serverError = (state = false, action) => {
  if (action.type === SET_SERVER_ERROR) {
    return action.payload;
  }
  return state;
};

const apiError = (state = "", action) => {
  if (action.type === SET_API_ERROR) {
    return action.payload;
  }
  return state;
};

const events = (state = [], action) => {
  if (action.type === SET_EVENTS) {
    return action.payload;
  }
  if (action.type === UPDATE_EVENT_IN_EVENTS) {
    const newState = [...state];
    const updatedEvent = action.payload;
    const evtIndex = newState.findIndex(evt => evt.id === updatedEvent.id);
    newState.splice(evtIndex, 1, updatedEvent);
    return newState;
  }
  if (action.type === ADD_EVENT_TO_EVENTS) {
    return [action.payload, ...state];
  }
  return state;
};

const rootReducer = combineReducers({
  currentUser,
  serverError,
  apiError,
  events
});

export default rootReducer;
