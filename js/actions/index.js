import { SET_CURRENT_USER } from "../Constants";

export function setCurrentUser(userObj) {
  return { type: SET_CURRENT_USER, payload: userObj };
}
