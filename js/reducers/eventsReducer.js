import {ADD_EVENT_TO_EVENTS, SET_EVENTS, UPDATE_EVENT_IN_EVENTS} from '../Constants';

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

export default events;
