import React from "react";
import Users from "./Users.jsx";
import { Redirect } from "react-router-dom";

class Main extends React.Component {
  state = {
    isRedirect: false
  };

  onLogout = () => {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("user");
    this.setState({ isRedirect: true });
  };

  render() {
    if (this.state.isRedirect) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="container">
        <div className="card bg-light">
          <Users filter={this.state.filter} onLogout={this.onLogout} />
        </div>
      </div>
    );
  }
}

export default Main;
