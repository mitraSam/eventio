import {
    setServerError,
    setApiError,
    setCurrentUser,
    setEvents,
    updateEventInEvents,
    addEventToEvents,
} from './actionCreators';
import {
    postData,
    setUserToken,
    getUserFromToken,
    apiErroMessages,
    getData,
    getUserToken,
    deleteData,
    removeUserToken,
} from '../Utils';

export const clearErrors = () => dispatch => {
    dispatch(setServerError(false));
    dispatch(setApiError(''));
};

const handleError = dispatch => err => {
    const {response} = err;
    if (!response) {
        dispatch(setServerError(true));
    }
    const {error} = response.data;

    /* if there is a default message provided for error type set apiError to reference it */
    if (apiErroMessages[error]) {
        dispatch(setApiError(apiErroMessages[error]));
    } else {
        dispatch(setApiError(error));
    }
};

export const handleAddEventError = dispatch => err => {
    const {response} = err;
    const fields = ['startsAt', 'title', 'description'];
    if (!response) return dispatch(setServerError(true));
    const {errors} = response.data;
    /* validation errors for the events api come it two forms: array || objects
     * set apiError according to type of error object
     * */
    if (Array.isArray(errors)) return dispatch(setApiError(errors[0].message));

    fields.forEach(field => {
        if (field in errors) return dispatch(setApiError(errors[field].message));
    });
};

export const doAuthentication = (data, type) => dispatch => {
    const param = type === 'create' ? 'users' : 'auth/native';
    postData(param, data)
        .then(res => {
            /* set user auth token in localStorage, decode it and update store currentUser prop to reference the data object */
            setUserToken(res.headers.authorization);
            dispatch(setCurrentUser(getUserFromToken()));
        })
        .catch(handleError(dispatch));
};

export const loadEvents = () => dispatch => {
    getData('events')
        /* trigger events reducer to update  events prop  */
        .then(({data}) => dispatch(setEvents(data)))
        .catch(handleError(dispatch));
};

export const joinEvent = param => dispatch => {
    const token = getUserToken();
    postData(param, {}, token)
        /* trigger events reducer to update  events prop with event  */
        .then(({data}) => dispatch(updateEventInEvents(data)))
        .catch(handleError(dispatch));
};

export const leaveEvent = param => dispatch => {
    const token = getUserToken();
    deleteData(param, token)
        .then(({data}) => {
            /* trigger events reducer to update  events prop with event  */
            dispatch(updateEventInEvents(data));
        })
        .catch(handleError(dispatch));
};

export const addEvent = data => dispatch => {
    const token = getUserToken();

    postData('events', data, token)
        .then(({data}) => {
            /* trigger events reducer to update  events prop with new event  */
            dispatch(addEventToEvents(data));
        })
        .catch(handleAddEventError(dispatch));
};

export const logUserOut = () => dispatch => {
    /* remove user token & trigger currentUser reducer to set currentUser prop to empty obj */
    removeUserToken();
    dispatch(setCurrentUser({}));
};
