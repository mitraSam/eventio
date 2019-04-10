import { connect } from "react-redux";
import { setCurrentUser } from "../actions";
import { removeUserToken, tokenAvailable } from "../Utils";

const mapStateToProps = state => ({ currentUser: state.currentUser });
const mapDispatchToProps = dispatch => ({
  setUser(userObj) {
    dispatch(setCurrentUser(userObj));
  },
  tokenStillAvailable() {
    if (!tokenAvailable()) {
      dispatch(setCurrentUser({}));
      return false;
    }
    return true;
  },
  logout() {
    removeUserToken();
    dispatch(setCurrentUser({}));
  }
});

const WithCurrentUser = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default WithCurrentUser;
