import {
    ADD_EVENT_TO_EVENTS,
    SET_API_ERROR,
    SET_CURRENT_USER,
    SET_EVENTS,
    SET_SERVER_ERROR,
    UPDATE_EVENT_IN_EVENTS,
} from '../Constants';

export function setCurrentUser(userObj) {
    return {type: SET_CURRENT_USER, payload: userObj};
}
export function setServerError(error) {
    return {type: SET_SERVER_ERROR, payload: error};
}
export function setApiError(error) {
    return {type: SET_API_ERROR, payload: error};
}
export function setEvents(data) {
    return {type: SET_EVENTS, payload: data};
}
export function updateEventInEvents(updatedEvent) {
    return {type: UPDATE_EVENT_IN_EVENTS, payload: updatedEvent};
}
export function addEventToEvents(e) {
    return {type: ADD_EVENT_TO_EVENTS, payload: e};
}
