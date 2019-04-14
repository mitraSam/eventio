import {combineReducers} from 'redux';
import {apiError, serverError} from './errorsReducer';
import currentUser from './userReducer';
import events from './eventsReducer';

const rootReducer = combineReducers({
    currentUser,
    serverError,
    apiError,
    events,
});

export default rootReducer;
