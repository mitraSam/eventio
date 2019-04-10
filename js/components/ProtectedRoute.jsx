import React from "react";
import { Route, Redirect } from "react-router";
import WithCurrentUser from "../containers/WithCurrentUser";

const PrivateRouteComponent = props => (
  <Route
    {...props.routeProps}
    render={() =>
      props.currentUser.id ? (
        <div>{props.component()}</div>
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);
export default WithCurrentUser(PrivateRouteComponent);
