import { SET_API_ERROR, SET_SERVER_ERROR } from "../Constants";

export const serverError = (state = false, action) => {
  if (action.type === SET_SERVER_ERROR) {
    return action.payload;
  }
  return state;
};

export const apiError = (state = "", action) => {
  if (action.type === SET_API_ERROR) {
    return action.payload;
  }
  return state;
};
