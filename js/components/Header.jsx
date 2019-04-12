import React, { Component } from "react";
import { Link } from "react-router-dom";
import "styles/header.scss";

import WithCurrentUser from "../containers/WithCurrentUser";

class Header extends Component {
  state = {
    showDropdown: false
  };
  componentDidMount() {
    this.props.tokenStillAvailable();
  }
  handleDropdown = () =>
    this.setState(prev => ({ showDropdown: !prev.showDropdown }));

  handleLogout = () => {
    const { logout, history } = this.props;
    logout();
    history.push("/login");
  };

  render() {
    const { currentUser, hideLink, onSignUp } = this.props;
    const { showDropdown } = this.state;
    const hide = hideLink ? "hideLink" : "";
    const hideDropdown = showDropdown ? "" : "hide";
    let nav;
    if (onSignUp) {
      nav = (
        <nav className="mainHeader__nav">
          <Link className="mainHeader__logo" to={"/"} rel="home">
            E.
          </Link>

          <ul className={`${hide} mainHeader__nav__link-container`}>
            <li className="mainHeader__nav--link">
              <Link to={"/login"}>
                Dont have an account?<span> Sign up</span>
              </Link>
            </li>
          </ul>
        </nav>
      );
    } else {
      nav = (
        <nav className="mainHeader__nav">
          <Link className="mainHeader__logo" to={"/"} rel="home">
            E.
          </Link>

          <ul className={`${hide} mainHeader__nav__link-container`}>
            <li className="mainHeader__nav--link">
              <Link to={"/login"}>
                Dont have an account?<span> Sign up</span>
              </Link>
            </li>
          </ul>
        </nav>
      );
    }
    if (currentUser.id) {
      const { firstName, lastName } = currentUser;
      const firsInitial = firstName.charAt(0);
      const lastInitial = lastName.charAt(0);
      nav = (
        <nav className="mainHeader__nav">
          <Link className="mainHeader__logo" to={"/"} rel="home">
            E.
          </Link>
          <ul className={`mainHeader__nav__link-container`}>
            <li className="mainHeader__nav--initials">
              <span>{`${firsInitial}${lastInitial}`}</span>
            </li>
            <li className="mainHeader__nav--name">{`${firstName} ${lastName}`}</li>
            <li>
              <button
                className="mainHeader__nav--arrow"
                onClick={this.handleDropdown}
              />
            </li>
            <li className={`mainHeader__nav--logout ${hideDropdown}`}>
              <button onClick={this.handleLogout}>logout</button>
            </li>
          </ul>
        </nav>
      );
    }
    return <header className="mainHeader">{nav}</header>;
  }
}

export default WithCurrentUser(Header);
