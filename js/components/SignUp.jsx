import React from "react";
import "styles/form";

import WithCurrentUser from "../containers/WithCurrentUser";
import ErrorDisplay from "./ErrorDisplay";
import { Link } from "react-router-dom";
import FormClass from "./FormClass";
import PropTypes from "prop-types";

class SignUp extends FormClass {
  state = {
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    repeatPassword: { value: "", error: "" },
    firstName: { value: "", error: "" },
    lastName: { value: "", error: "" }
  };

  componentDidMount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.checkForEmptyInputs(Array.from(e.target.elements))) {
      const data = this.dataFromFields();
      const { clearErrors, setUser } = this.props;
      clearErrors();
      setUser(data, "create");
    }
  };

  dataFromFields = () => {
    const { firstName, lastName, email, password } = this.state;
    return {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value
    };
  };

  render() {
    const { email, password, firstName, lastName, repeatPassword } = this.state;
    const { apiError, serverError } = this.props;
    const error = apiError ? "error" : "";
    return (
      <div className="login__form-wrapper">
        {!serverError && (
          <form
            noValidate
            className={`form-component ${error}`}
            onSubmit={this.handleSubmit}
          >
            <legend>Get started absolutely free</legend>
            {apiError ? (
              <p className="form-component__apiError">{apiError}</p>
            ) : (
              <sub>Enter your details below</sub>
            )}

            <p>
              <span className="form-component__annot">
                {firstName.value ? "First name" : ""}
              </span>
              <input
                type="text"
                placeholder="First name"
                className={`form-component__input ${error}`}
                onChange={this.handleText}
                name="firstName"
                value={firstName.value}
              />
              <span className="form-component__input-error">
                {firstName.error ? firstName.error : ""}
              </span>
            </p>
            <p>
              <span className="form-component__annot">
                {lastName.value ? "Last name" : ""}
              </span>
              <input
                type="text"
                placeholder="Last name"
                className={`form-component__input ${error}`}
                onChange={this.handleText}
                name="lastName"
                value={lastName.value}
              />
              <span className="form-component__input-error">
                {lastName.error ? lastName.error : ""}
              </span>
            </p>

            <p>
              <span className="form-component__annot">
                {email.value ? "Email" : ""}
              </span>
              <input
                type="email"
                placeholder="Email"
                className={`form-component__input ${error}`}
                onChange={this.handleEmail}
                name="email"
                value={email.value}
              />
              <span className="form-component__input-error">
                {email.error ? email.error : ""}
              </span>
            </p>

            <p>
              <span className="form-component__annot">
                {password.value ? "Password" : ""}
              </span>
              <input
                type="password"
                placeholder="Password"
                className={`form-component__input ${error}`}
                onChange={this.handlePassword}
                name="password"
                value={password.value}
              />
              <span className="form-component__input-error">
                {password.error ? password.error : ""}
              </span>
            </p>
            <p>
              <span className="form-component__annot">
                {repeatPassword.value ? "Repeat password" : ""}
              </span>
              <input
                type="password"
                placeholder="Repeat password"
                className={`form-component__input ${error}`}
                onChange={this.handleRepeatPassword}
                name="repeatPassword"
                value={repeatPassword.value}
              />
              <span className="form-component__input-error">
                {repeatPassword.error ? repeatPassword.error : ""}
              </span>
            </p>
            <Link
              className="form-component__bottomLink"
              to="/login"
              escape="false"
            >
              Already have an account ?<em> sign in</em>
            </Link>
            <button
              className="form-component__submit"
              type="submit"
              onSubmit={this.handleSubmit}
            >
              {" "}
              Sign up
            </button>
          </form>
        )}
        {serverError && <ErrorDisplay />}
      </div>
    );
  }
}

SignUp.propTypes = {
  currentUser: PropTypes.object.isRequired,
  apiError: PropTypes.string.isRequired,
  serverError: PropTypes.bool.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
};

export default WithCurrentUser(SignUp);
