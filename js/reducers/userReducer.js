import { SET_CURRENT_USER } from "../Constants";

const currentUser = (state = {}, action) => {
  if (action.type === SET_CURRENT_USER) {
    return action.payload;
  }
  return state;
};

export default currentUser;
