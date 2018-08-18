import React from "react";
import Button from "../Button/Button.jsx";
import Inputs from "./Inputs.jsx";
import FormValidator from "../FormValidator/FormValidator";
import Alert from "../Alert/Alert.jsx";
import Validation from "./Validation";
import UserService from "../../services/UserService";
import { Link, Redirect } from "react-router-dom";

class SignInForm extends React.Component {
  validator = new FormValidator(Validation());
  state = {
    fields: {
      email: "",
      password: ""
    },
    validation: this.validator.valid(),
    serverError: null,
    isRedirect: false
  };

  userService = new UserService();
  submitted = false;

  onSubmit = async event => {
    event.preventDefault();
    const validation = this.validator.validate(this.state.fields);
    this.setState({ validation });
    this.submitted = true;
    let { email, password } = this.state.fields;
    if (validation.isValid) {
      try {
        let result = await this.userService.login(email, password);
        let user = result.data.result;
        let jwt = result.data.token;
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("jwt", jwt);
        this.setState({ isRedirect: true });
      } catch (ex) {
        this.setState({ serverError: ex });
      }
    }
  };

  onInputChange = event => {
    let fields = this.state.fields;
    fields[event.target.id] = event.target.value;
    this.setState({ fields });
  };

  closeAlert = () => {
    this.setState({ serverError: null });
  };

  render() {
    let validation = this.submitted
      ? this.validator.validate(this.state.fields)
      : this.state.validation;

    return (
      <div>
        {this.state.serverError ? (
          <Alert
            alertClass="alert-danger"
            error="true"
            serverError={this.state.serverError}
            closeAlert={this.closeAlert.bind(this)}
          />
        ) : null}

        {this.state.isRedirect ? (
          <Redirect to="/main" />
        ) : (
          <form
            className="form-horizontal "
            onSubmit={this.onSubmit.bind(this)}
          >
            <Inputs
              validation={validation}
              onInputChange={this.onInputChange.bind(this)}
              state={this.state.fields}
            />
            <div
              className="btn-toolbar"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div
                className="btn-group mr-2"
                role="group"
                aria-label="Second group"
              >
                <Button
                  type="submit"
                  btnClass="btn btn-success"
                  msg="Sign In"
                />
              </div>
              <div className="btn-group" role="group" aria-label="Third group">
                <Link to="/SignUp">Not a member? SignUp</Link>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default SignInForm;
