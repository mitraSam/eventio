import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import 'styles/mainHeader';

import WithCurrentUser from '../containers/WithCurrentUser';

class MainHeader extends Component {
    state = {
        showDropdown: false,
    };

    handleDropdown = () => this.setState(prev => ({showDropdown: !prev.showDropdown}));

    handleLogout = () => {
        const {logout} = this.props;
        /* log user out =>triggers reduce action */
        logout();
    };

    render() {
        const {currentUser, isOnAuth, isOnSignup} = this.props;
        const {showDropdown} = this.state;
        const hideOnMobile = isOnAuth ? 'hideOnMobile' : '';
        const hideDropdown = showDropdown ? '' : 'hide';
        const link = isOnSignup ? (
            <Link className="mainHeader__nav__link" to="/login">
                Already have an account?<em> Sign in</em>
            </Link>
        ) : (
            <Link className="mainHeader__nav__link" to="/">
                <span className="hideOnMobile">{`Don't have an account?`}</span>
                <em> Sign up</em>
            </Link>
        );
        let nav = (
            <nav className="mainHeader__nav">
                <Link className="mainHeader__logo" to="/" rel="home">
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28">
                        <path
                            fill="#323C46"
                            fillRule="evenodd"
                            d="M.078 27V.058H16.95v4.94H5.322v6.156h10.526v4.674H5.322v6.232H16.95V27H.078zm21.47-3.192c0-.963.336-1.78 1.007-2.451.671-.671 1.488-1.007 2.451-1.007.481 0 .937.089 1.368.266a3.394 3.394 0 0 1 1.862 1.843c.177.418.266.868.266 1.349A3.418 3.418 0 0 1 26.374 27c-.43.177-.887.266-1.368.266-.963 0-1.78-.336-2.451-1.007-.671-.671-1.007-1.488-1.007-2.451z"
                        />
                    </svg>
                </Link>
                <ul className={`mainHeader__nav__menu ${hideOnMobile}`}>
                    <li className="mainHeader__nav__link-container">{link}</li>
                </ul>
            </nav>
        );

        if (currentUser.id) {
            const {firstName, lastName} = currentUser;
            const firsInitial = firstName.charAt(0);
            const lastInitial = lastName.charAt(0);
            nav = (
                <nav className="mainHeader__nav">
                    <Link className="mainHeader__logo" to="/" rel="home">
                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28">
                            <path
                                fill="#323C46"
                                fillRule="evenodd"
                                d="M.078 27V.058H16.95v4.94H5.322v6.156h10.526v4.674H5.322v6.232H16.95V27H.078zm21.47-3.192c0-.963.336-1.78 1.007-2.451.671-.671 1.488-1.007 2.451-1.007.481 0 .937.089 1.368.266a3.394 3.394 0 0 1 1.862 1.843c.177.418.266.868.266 1.349A3.418 3.418 0 0 1 26.374 27c-.43.177-.887.266-1.368.266-.963 0-1.78-.336-2.451-1.007-.671-.671-1.007-1.488-1.007-2.451z"
                            />
                        </svg>
                    </Link>
                    <ul className="mainHeader__nav__menu">
                        <li className="mainHeader__nav__link-container initials">
                            <span>{`${firsInitial}${lastInitial}`}</span>
                        </li>
                        <li className="mainHeader__nav__link-container name hideOnMobile">{`${firstName} ${lastName}`}</li>
                        <li className="mainHeader__nav__link-container arrow">
                            <button onClick={this.handleDropdown} />
                        </li>
                        <li className={`mainHeader__nav__link-container logout ${hideDropdown}`}>
                            <button onClick={this.handleLogout}>Log out</button>
                        </li>
                    </ul>
                </nav>
            );
        }
        return <header className="mainHeader">{nav}</header>;
    }
}

MainHeader.defaultProps = {
    isOnAuth: false,
    isOnSignup: false,
};

MainHeader.propTypes = {
    tokenStillAvailable: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    isOnAuth: PropTypes.bool,
    isOnSignup: PropTypes.bool,
};

export default WithCurrentUser(MainHeader);
