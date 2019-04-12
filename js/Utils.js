import axios from "axios";
import jwt from "jsonwebtoken";

export const submitData = (data, method) => {
  const api = process.env.API_URL;
  const key = process.env.API_KEY;
  console.log(data, method, key, api);
  return axios({
    method: "post",
    url: `${api}`,
    data,
    config: {
      headers: {
        "Content-Type": "application/json",
        APIKey: key
      }
    }
  });
};
export const apiErroMessages = {
  ["User.InvalidPassword"]:
    "Ooops! That username & password combination is not valid",
  ["User.Exists"]: "Ooops! That email is already taken"
};

export const postData = (apiParam, data, Authorization = "") => {
  const key = process.env.API_KEY;
  const { API_URL } = process.env;

  return axios.post(`${API_URL}/${apiParam}`, data, {
    headers: {
      APIKey: key,
      Authorization,
      "Content-Type": "application/json"
    }
  });
};
export const deleteData = (apiParam, Authorization = "") => {
  const key = process.env.API_KEY;
  const { API_URL } = process.env;

  return axios.delete(`${API_URL}/${apiParam}`, {
    headers: {
      APIKey: key,
      Authorization,
      "Content-Type": "application/json"
    }
  });
};
export const getData = apiParam => {
  const key = process.env.API_KEY;
  const { API_URL } = process.env;

  return axios.get(`${API_URL}/${apiParam}`, {
    headers: {
      APIKey: key,
      "Content-Type": "application/json"
    }
  });
};

export const isDateFuture = date => {
  return date.getTime() > new Date().getTime();
};

export const getUserToken = () => localStorage.getItem("userToken");
export const getUserFromToken = () => jwt.decode(getUserToken()).user;
export const getExpFromToken = () => jwt.decode(getUserToken()).exp;
export const setUserToken = token => localStorage.setItem("userToken", token);

export const tokenStillValid = () => {
  const dateFromToken = new Date(getExpFromToken() * 1000);
  return dateFromToken.getTime() > new Date().getTime();
};
export const tokenAvailable = () =>
  getUserToken() ? !!tokenStillValid() : false;

export const removeUserToken = () => localStorage.removeItem("userToken");

export const stringNoWhitespace = string => /^(\w+?)$/u.test(string);
export const validateEmail = string => /^[a-z](\w*)+@strv.com/iu.test(string);

export const firstLetterUppercase = string =>
  string.charAt(0).toUpperCase() + string.slice(1);
