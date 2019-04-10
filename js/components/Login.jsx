import React, { Component } from "react";
import "styles/login";
import { getUserFromToken, postData, setUserToken } from "../Utils";
import WithCurrentUser from "../containers/WithCurrentUser";
import Form2 from "./Form2";
import ErrorDisplay from "./ErrorDisplay";

class Login extends Component {
  state = {
    apiError: "",
    serverError: ""
  };
  componentDidMount() {
    const { history, currentUser } = this.props;
    if (currentUser.id) history.push("/events");
  }

  finishAuth = response => {
    const { setUser, history } = this.props;
    setUserToken(response.headers.authorization);
    setUser(getUserFromToken());
    history.push("/events");
  };

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

  clearErrors = () => this.setState({ apiError: "" });

  handleSubmit = data => {
    postData("auth/native", data)
      .then(this.finishAuth)
      .catch(this.handleAuthErr);
  };
  render() {
    const { serverError } = this.state;
    return (
      <div className="login__form-wrapper">
        {!serverError && (
          <Form2
            title="Sign in to Envatio."
            byline="Enter your details below"
            fields={["email", "password"]}
            btnLabel="Sign in"
            link={{
              href: "/signup",
              text: "Dont have an account?",
              extra: "sign up"
            }}
            clearApiError={this.clearErrors}
            apiError={this.state.apiError}
            sendData={this.handleSubmit}
          />
        )}
        {serverError && <ErrorDisplay path="login" />}
      </div>
    );
  }
}

export default WithCurrentUser(Login);
