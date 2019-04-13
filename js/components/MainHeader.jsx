import React, { Component } from "react";
import { Link } from "react-router-dom";
import "styles/mainHeader.scss";

import WithCurrentUser from "../containers/WithCurrentUser";

class MainHeader extends Component {
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
    const hideOnMobile = hideLink ? "hideOnMobile" : "";
    const hideDropdown = showDropdown ? "" : "hide";
    const link = onSignUp ? (
      <Link className="mainHeader__nav__link" to={"/login"}>
        Already have an account?<em> Sign in</em>
      </Link>
    ) : (
      <Link className="mainHeader__nav__link" to={"/"}>
        <span className="hideOnMobile">{"Don't have an account?"}</span>
        <em> Sign up</em>
      </Link>
    );
    let nav = (
      <nav className="mainHeader__nav">
        <Link className="mainHeader__logo" to={"/"} rel="home">
          E.
        </Link>

        <ul className={`mainHeader__nav__menu ${hideOnMobile}`}>
          <li className="mainHeader__nav__link-container">{link}</li>
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
          <ul className="mainHeader__nav__menu">
            <li className="mainHeader__nav__link-container initials">
              <span>{`${firsInitial}${lastInitial}`}</span>
            </li>
            <li className="mainHeader__nav__link-container name hideOnMobile">{`${firstName} ${lastName}`}</li>
            <li className="mainHeader__nav__link-container arrow">
              <button onClick={this.handleDropdown} />
            </li>
            <li
              className={`mainHeader__nav__link-container logout ${hideDropdown}`}
            >
              <button onClick={this.handleLogout}>Log out</button>
            </li>
          </ul>
        </nav>
      );
    }
    return <header className="mainHeader">{nav}</header>;
  }
}

export default WithCurrentUser(MainHeader);