import React, { Component } from "react";

import EventsPlaceholder from "./EventsPlaceholder";

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
    const { loaded } = this.state;
    const { props } = this.props;

    if (loaded) {
      return <this.component {...props} />;
    }
    return this.setPlaceholder();
  }
}

export default AsyncRoute;
