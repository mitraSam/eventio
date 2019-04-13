import React, { Component } from "react";
import PropTypes from "prop-types"; // ES6

import EventsPlaceholder from "./EventsPlaceholder";
import WithCurrentUser from "../containers/WithCurrentUser";
import SignUpPlaceholder from "./SignUpPlaceholder";
import LoginPlaceholder from "./LoginPlaceholder";
import { Redirect } from "react-router";

class AsyncRoute extends Component {
  state = {
    loaded: false
  };

  componentDidMount() {
    const { loadingComponent } = this.props;
    loadingComponent.then(module => {
      this.component = module.default;
      this.setState({ loaded: true });
    });
  }

  component = null;

  setPlaceholder() {
    const { path } = this.props;

    if (path === "events") return <EventsPlaceholder />;
    if (path === "/") return <SignUpPlaceholder />;
    if (path === "/login") return <LoginPlaceholder />;
    return "";
  }

  render() {
    const { isPrivate, currentUser, isPublic } = this.props;
    if (isPrivate && !currentUser.id) {
      return <Redirect to="/login" />;
    }
    if (isPublic && currentUser.id) {
      return <Redirect to="/events" />;
    }
    const { loaded } = this.state;
    const { props } = this.props;

    if (loaded) {
      return <this.component {...props} />;
    }
    return this.setPlaceholder();
  }
}
AsyncRoute.defaultProps = {
  path: "",
  isPrivate: false,
  isPublic: false
};
AsyncRoute.propTypes = {
  loadingComponent: PropTypes.object.isRequired,
  path: PropTypes.string,
  props: PropTypes.object.isRequired,
  isPrivate: PropTypes.bool,
  currentUser: PropTypes.object.isRequired,
  isPublic: PropTypes.bool
};
export default WithCurrentUser(AsyncRoute);
