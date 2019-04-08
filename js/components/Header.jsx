import React, { Component } from "react";
import { Link } from "react-router-dom";
import "styles/header.scss";

import WithCurrentUser from "../containers/WithCurrentUser";

class Header extends Component {
  render() {
    const { currentUser, onLogin } = this.props;
    const onLoginClass = onLogin ? "onLogin" : "";
    let nav = (
      <nav className="mainHeader__nav">
        <Link className="mainHeader__logo" to={"/"} rel="home">
          E.
        </Link>

        <ul className={`${onLoginClass}`}>
          <li className="mainHeader__nav--link">
            <Link to={"/login"}>
              Dont have an account?<span> Sign up</span>
            </Link>
          </li>
        </ul>
      </nav>
    );

    if (currentUser.id) {
      const { firstName, lastName } = currentUser;
      const firsInitial = firstName.charAt(0);
      const lastInitial = lastName.charAt(0);
      nav = (
        <nav className="mainHeader__nav">
          <Link className="mainHeader__logo" to={"/"} rel="home">
            E.
          </Link>
          <ul className="mainHeader__nav__link-container">
            <li className="mainHeader__nav--initials">
              <span>{`${firsInitial}${lastInitial}`}</span>
            </li>
            <li className="mainHeader__nav--name">{`${firstName} ${lastName}`}</li>
            <li className="mainHeader__nav--arrow" />
            <li className="mainHeader__nav--logout">logout</li>
          </ul>
        </nav>
      );
    }
    return <header className="mainHeader">{nav}</header>;
  }
}

export default WithCurrentUser(Header);
