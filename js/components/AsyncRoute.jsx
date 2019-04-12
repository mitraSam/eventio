import React, { Component } from "react";

import EventsPlaceholder from "./EventsPlaceholder";
import WithCurrentUser from "../containers/WithCurrentUser";
import SignUpPlaceholder from "./SignUpPlaceholder";
import { Redirect } from "react-router";

class AsyncRoute extends Component {
  state = {
    loaded: false
  };

  component = null;

  componentDidMount() {
    const { loadingComponent } = this.props;
    loadingComponent.then(module => {
      this.component = module.default;
      this.setState({ loaded: true });
    });
  }

  setPlaceholder() {
    const { path } = this.props;
    if (path === "events") return <EventsPlaceholder />;
    if (path === "/") return <SignUpPlaceholder />;
    return "";
  }

  render() {
    const { protect, currentUser, noUser } = this.props;
    if (protect && !currentUser.id) {
      return <Redirect to={"/login"} />;
    }
    if (noUser && currentUser.id) {
      return <Redirect to={"/events"} />;
    }

    const { loaded } = this.state;
    const { props } = this.props;

    if (loaded) {
      return <this.component {...props} />;
    }
    return this.setPlaceholder();
  }
}

export default WithCurrentUser(AsyncRoute);
