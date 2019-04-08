import React, { Component } from "react";
import "styles/login";
import { postData } from "../Utils";
import Form from "./Form";

class Login extends Component {
  state = {
    authError: ""
  };
  componentDidMount() {
    const { history, currentUser } = this.props;
    if (currentUser.id) history.push("/test");
  }

  finishAuth = response => {
    console.log(response);
  };

  handleAuthErr = ({ response }) => {
    const { error } = response.data;
    if (error === "User.InvalidPassword")
      this.setState({
        authError: "Ooops! That username & password combination is not valid"
      });
  };

  clearErrors = () => this.setState({ authError: "" });

  handleSubmit = data => {
    postData(data)
      .then(this.finishAuth)
      .catch(this.handleAuthErr);
  };
  render() {
    return (
      <div className="login__form-wrapper">
        <Form
          title="Sign in to Envatio."
          byline="Enter your details below"
          fields={["email", "password"]}
          btnLabel="Sign in"
          link={{
            href: "/signup",
            text: "Dont have an account?",
            extra: "sign up"
          }}
          clearAuthError={this.clearErrors}
          authError={this.state.authError}
          sendData={this.handleSubmit}
        />
      </div>
    );
  }
}

export default Login;
