import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";

import store from "../store";

import AsyncRoute from "./AsyncRoute";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Switch>
            <Route
              exact
              path="/"
              component={props => (
                <AsyncRoute
                  props={props}
                  path="/"
                  isPublic={true}
                  loadingComponent={import("./PageLayoutSignUp")}
                />
              )}
            />
            <Route
              exact
              path="/events"
              component={props => (
                <AsyncRoute
                  props={props}
                  isPrivate={true}
                  path="events"
                  loadingComponent={import("./Events")}
                />
              )}
            />
            <Route
              exact
              path="/login"
              component={props => {
                return (
                  <AsyncRoute
                    props={props}
                    isPublic={true}
                    path={"/login"}
                    loadingComponent={import("./PageLayoutLogin")}
                  />
                );
              }}
            />
            <Route
              exact
              path="/signup"
              component={props => (
                <AsyncRoute
                  props={props}
                  loadingComponent={import("./PageLayoutSignUp")}
                />
              )}
            />
            <Route
              component={props => (
                <AsyncRoute
                  props={props}
                  loadingComponent={import("./PageLayout404")}
                />
              )}
            />
          </Switch>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
