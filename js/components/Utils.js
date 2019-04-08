import axios from "axios";
import jwt from "jsonwebtoken";

export const postData = data => {
  const api = process.env.API_URL;
  const key = process.env.API_KEY;
  return axios.post(api, data, {
    headers: {
      APIKey: key,
      "Content-Type": "application/json"
    }
  });
};

export const getUserToken = () => localStorage.getItem("userToken");
export const getUserFromToken = () => jwt.decode(getUserToken()).user;
export const setUserToken = token => localStorage.setItem("userToken", token);

export const stringNoWhitespace = string => /^(\w+?)$/u.test(string);
export const validateEmail = string => /^[a-z](\w*)+@strv.com/iu.test(string);

export const firstLetterUppercase = string =>
  string.charAt(0).toUpperCase() + string.slice(1);
