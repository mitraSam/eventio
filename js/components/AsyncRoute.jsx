import React, { Component } from "react";

import EventsPlaceholder from "./EventsPlaceholder";
import WithCurrentUser from "../containers/WithCurrentUser";

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
    return "";
  }

  render() {
    const { history } = this.props.props;
    const { protect, currentUser } = this.props;
    if (protect && !currentUser.id) {
      history.push("/login");
      return null;
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
