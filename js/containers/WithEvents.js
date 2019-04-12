import { tokenAvailable } from "../Utils";
import {
  clearErrors,
  setCurrentUser,
  loadEvents,
  joinEvent,
  leaveEvent,
  addEvent
} from "../actions";
import connect from "react-redux/es/connect/connect";

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    events: state.events,
    apiError: state.apiError,
    serverError: state.serverError
  };
};
const mapDispatchToProps = dispatch => ({
  getEvents() {
    dispatch(loadEvents());
  },
  tokenStillAvailable() {
    if (!tokenAvailable()) {
      dispatch(setCurrentUser({}));
      return false;
    }
    return true;
  },
  joinEvt(param) {
    dispatch(joinEvent(param));
  },
  leaveEvt(param) {
    dispatch(leaveEvent(param));
  },
  createEvt(data) {
    dispatch(addEvent(data));
  },

  clearErrors() {
    dispatch(clearErrors());
  }
});

const WithEvents = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default WithEvents;
