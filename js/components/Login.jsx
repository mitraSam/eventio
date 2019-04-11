import React from "react";
import "styles/login";
import "styles/form";

import WithCurrentUser from "../containers/WithCurrentUser";
import ErrorDisplay from "./ErrorDisplay";
import { Link } from "react-router-dom";
import FormClass from "./FormClass";
import { postData } from "../Utils";

class Login extends FormClass {
  state = {
    apiError: "",
    serverError: "",
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    fields: ["password", "email"]
  };

  componentDidMount() {
    const { history, currentUser } = this.props;
    if (currentUser.id) history.push("/events");
  }

  handleAuthErr = ({ response }) => {
    console.log("failed", response);

    if (!response) return this.setState({ serverError: true });

    const { error } = response.data;
    if (error === "User.InvalidPassword")
      return this.setState({
        apiError: "Ooops! That username & password combination is not valid"
      });
    this.setState({ serverError: true });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.checkForEmptyInputs()) {
      const { password, email } = this.state;
      const data = { password: password.value, email: email.value };
      postData("auth/native", data)
        .then(this.finishAuth)
        .catch(this.handleAuthErr);
    }
  };

  render() {
    const { serverError, apiError, email, password } = this.state;
    const error = apiError ? "error" : "";
    return (
      <div className="login__form-wrapper">
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
              to={`/signup`}
              escape="false"
            >
              {`Don't have an account ?`}
              <em>sign up</em>
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
        {serverError && <ErrorDisplay path="login" />}
      </div>
    );
  }
}

export default WithCurrentUser(Login);
