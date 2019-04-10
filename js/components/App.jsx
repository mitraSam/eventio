import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";

import store from "../store";
import Landing from "./PageLayout";

import AsyncRoute from "./AsyncRoute";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Switch>
            <Route exact path="/" component={Landing()} />

            <Route
              exact
              path="/events"
              component={props => (
                <AsyncRoute
                  props={props}
                  protect={true}
                  path="events"
                  loadingComponent={import("./Events")}
                />
              )}
            />
            <Route
              exact
              path="/login"
              component={props => {
                console.log(store);
                return (
                  <AsyncRoute
                    props={props}
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
