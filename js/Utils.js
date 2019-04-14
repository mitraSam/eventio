import axios from 'axios';
import jwt from 'jsonwebtoken';

export const apiErroMessages = {
    ['User.InvalidPassword']: 'Ooops! That username & password combination is not valid',
    ['User.Exists']: 'Ooops! That email is already taken',
};

export const postData = (apiParam, data, Authorization = '') => {
    const key = process.env.API_KEY;
    const {API_URL} = process.env;

    return axios.post(`${API_URL}/${apiParam}`, data, {
        headers: {
            APIKey: key,
            Authorization,
            'Content-Type': 'application/json',
        },
    });
};
export const deleteData = (apiParam, Authorization = '') => {
    const key = process.env.API_KEY;
    const {API_URL} = process.env;

    return axios.delete(`${API_URL}/${apiParam}`, {
        headers: {
            APIKey: key,
            Authorization,
            'Content-Type': 'application/json',
        },
    });
};
export const getData = apiParam => {
    const key = process.env.API_KEY;
    const {API_URL} = process.env;

    return axios.get(`${API_URL}/${apiParam}`, {
        headers: {
            APIKey: key,
            'Content-Type': 'application/json',
        },
    });
};

export const isDateFuture = date => {
    return date.getTime() > new Date().getTime();
};

export const getUserToken = () => localStorage.getItem('userToken');

/* returns user object */
export const getUserFromToken = () => jwt.decode(getUserToken()).user;

/* returns token expiration date */
export const getExpFromToken = () => jwt.decode(getUserToken()).exp;

export const setUserToken = token => localStorage.setItem('userToken', token);

/* check if token has not expired */
export const tokenStillValid = () => {
    const dateFromToken = new Date(getExpFromToken() * 1000);
    return dateFromToken.getTime() > new Date().getTime();
};

/* check if there is any userToken in the localStorage & if it's not expired */
export const tokenAvailable = () => (getUserToken() ? !!tokenStillValid() : false);

export const removeUserToken = () => localStorage.removeItem('userToken');

/* return true if string contains no whitespace */
export const stringNoWhitespace = string => /^(\w+?)$/u.test(string);
export const validateEmail = string => /^[a-z](\w*)+@strv.com/iu.test(string);

export const firstLetterUppercase = string => string.charAt(0).toUpperCase() + string.slice(1);

/* returns string from date formatted accord with event card design */
export const dateToString = evtDate => {
    const options = {
        timeZone: 'Europe/Prague',
        year: 'numeric',
        minute: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
    };
    const date = new Date(evtDate);
    const formatedDate = new Intl.DateTimeFormat('en-US', options).format(date, options);
    return formatedDate.replace(/,([^,]*)$/u, ' - $1');
};
export const shortenText = str => str.slice(0, 30).concat('...');
