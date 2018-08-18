import React from "react";
import { Redirect, Route } from "react-router-dom";

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, ...props } = this.props;
    return (
      <Route
        {...props}
        render={props =>
          sessionStorage.getItem("jwt") ? (
            <Component {...props} />
          ) : (
            <Redirect to="/SignIn" />
          )
        }
      />
    );
  }
}

export default PrivateRoute;
