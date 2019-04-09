import { connect } from "react-redux";
import { setCurrentUser } from "../actions";
import { tokenAvailable } from "../Utils";

const mapStateToProps = state => ({ currentUser: state.currentUser });
const mapDispatchToProps = dispatch => ({
  setUser(userObj) {
    dispatch(setCurrentUser(userObj));
  },
  checkTokenExp() {
    if (!tokenAvailable()) dispatch(setCurrentUser({}));
  }
});

const WithCurrentUser = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default WithCurrentUser;
