import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import {Redirect, Route, Switch} from 'react-router';
import AsyncRoute from './AsyncRoute';
import PropTypes from 'prop-types';

class AppRouter extends Component {
    render() {
        const {currentUser} = this.props;
        const loggedIn = currentUser.id;
        return (
            <Switch>
                <Route
                    exact
                    path="/"
                    component={props =>
                        loggedIn ? (
                            <Redirect to="/events" />
                        ) : (
                            <AsyncRoute
                                props={props}
                                path="/"
                                isPublic={true}
                                loadingComponent={import('./PageLayoutSignUp')}
                            />
                        )
                    }
                />
                <Route
                    exact
                    path="/events"
                    component={props =>
                        loggedIn ? (
                            <AsyncRoute
                                props={props}
                                isPrivate={true}
                                path="events"
                                loadingComponent={import('./Events')}
                            />
                        ) : (
                            <Redirect to="/login" />
                        )
                    }
                />
                <Route
                    exact
                    path="/login"
                    component={props => {
                        return loggedIn ? (
                            <Redirect to="/events" />
                        ) : (
                            <AsyncRoute
                                props={props}
                                isPublic={true}
                                path="login"
                                loadingComponent={import('./PageLayoutLogin')}
                            />
                        );
                    }}
                />
                <Route
                    exact
                    path="/signup"
                    component={props =>
                        loggedIn ? (
                            <Redirect to="/events" />
                        ) : (
                            <AsyncRoute props={props} loadingComponent={import('./PageLayoutSignUp')} />
                        )
                    }
                />
                <Route component={props => <AsyncRoute props={props} loadingComponent={import('./PageLayout404')} />} />
            </Switch>
        );
    }
}

AppRouter.propTypes = {
    currentUser: PropTypes.object.required,
};

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
    };
};
export default connect(mapStateToProps)(AppRouter);
