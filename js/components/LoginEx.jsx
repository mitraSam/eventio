import React, { Component } from "react";
import { Link } from "react-router-dom";
import "styles/login";
import {
  submitData,
  getUserFromToken,
  setUserToken,
  stringNoWhitespace,
  validateEmail
} from "../Utils";
import WithCurrentUser from "../containers/WithCurrentUser";

class Form extends Component {
  state = {
    username: "",
    password: "",
    apiError: ""
  };
  componentDidMount() {
    const { history, currentUser } = this.props;
    if (currentUser.id) history.push("/test");
  }

  handleFieldChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  validateInputs() {
    const { username, password } = this.state;
    const validString = stringNoWhitespace(password);

    const validEmail = validateEmail(username);

    if (!validString)
      this.setState({ passwordError: "password cannot be empty" });
    if (!validEmail)
      this.setState({ usernameError: "please provide correct email" });

    return !(!validString || !validEmail);
  }

  finishAuth = ({ data }) => {
    console.log(data);
    const { setUser } = this.props;
    setUserToken(data);
    setUser(getUserFromToken());
  };

  handleAuthErr = () => {
    console.log("here");
    this.setState({
      apiError: "Ooops! That username & password combination is not valid"
    });
  };

  clearErrors() {
    this.setState({ passwordError: "", usernameError: "", apiError: "" });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.clearErrors();
    if (this.validateInputs()) {
      const { username, password } = this.state;
      submitData({ username, password }, "signin", "post")
        .then(this.finishAuth)
        .catch(this.handleAuthErr);
    }
  };
  render() {
    const {
      username,
      password,
      usernameError,
      passwordError,
      authError
    } = this.state;
    return (
      <div className="login__wrapper">
        <h2 className="login__title">Sign in to Envatio.</h2>
        {authError ? (
          <p className="login__authError">{authError}</p>
        ) : (
          <p className="login__byline">Enter your details below</p>
        )}
        <form
          className={`login__form ${authError ? "error" : ""}`}
          onSubmit={this.handleSubmit}
        >
          <span className="login__form-annotation">{username && "Email"}</span>
          <input
            className="login__form--input"
            type="text"
            value={username}
            onChange={this.handleFieldChange}
            placeholder="Email"
            name="username"
            /*pattern="^[a-z](\w*)+@strv.com"
                        size="30"
                        required*/
          />
          {usernameError && <p>{usernameError}</p>}
          <span className="login__form-annotation">
            {password && "Password"}
          </span>

          <input
            className="login__form--input"
            type="password"
            value={password}
            onChange={this.handleFieldChange}
            placeholder="Password"
            name="password"
            /*required*/
          />

          {passwordError && <p>{passwordError}</p>}
          <Link className="login__signupLink" to="/signup">
            Dont have an account? <span>sign up</span>
          </Link>
          <button className="login__submit" type="submit">
            sign in
          </button>
        </form>
      </div>
    );
  }
}

export default WithCurrentUser(Form);
