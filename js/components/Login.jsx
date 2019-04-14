import React from "react";
import "styles/form";
import PropTypes from "prop-types";
import WithCurrentUser from "../containers/WithCurrentUser";
import ErrorDisplay from "./ErrorDisplay";
import { Link } from "react-router-dom";
import FormClass from "./FormClass";

class Login extends FormClass {
  state = {
    apiError: "",
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    fields: ["password", "email"]
  };

  componentDidMount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.checkForEmptyInputs(Array.from(e.target.elements))) {
      const { password, email } = this.state;
      const data = { password: password.value, email: email.value };
      const { setUser, clearErrors } = this.props;
      clearErrors();
      setUser(data);
    }
  };

  render() {
    const { email, password } = this.state;
    const { apiError, serverError } = this.props;

    const error = apiError ? "error" : "";
    return (
      <div>
        {!serverError && (
          <form
            noValidate
            className={`form-component ${error}`}
            onSubmit={this.handleSubmit}
          >
            <legend>Sign in to Eventio</legend>
            {apiError ? (
              <p className="form-component__apiError">{apiError}</p>
            ) : (
              <sub>Enter your details below</sub>
            )}
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
                onChange={this.handleText}
                name="password"
                value={password.value}
              />
              <span className="form-component__input-error">
                {password.error ? password.error : ""}
              </span>
            </p>
            <Link
              className="form-component__bottomLink"
              to="/signup"
              escape="false"
            >
              {`Don't have an account ?`}
              <em> sign up</em>
            </Link>
            <button
              className="form-component__submit"
              type="submit"
              onSubmit={this.handleSubmit}
            >
              Sign in
            </button>
          </form>
        )}
        {serverError && <ErrorDisplay />}
      </div>
    );
  }
}

Login.propTypes = {
  currentUser: PropTypes.object.isRequired,
  apiError: PropTypes.string.isRequired,
  serverError: PropTypes.bool.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
};

export default WithCurrentUser(Login);
