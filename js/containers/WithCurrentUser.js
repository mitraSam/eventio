import {connect} from 'react-redux';
import {logUserOut, clearErrors, doAuthentication} from '../actions';
import {setCurrentUser} from '../actions/actionCreators';
import {tokenAvailable} from '../Utils';

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,

        apiError: state.apiError,
        serverError: state.serverError,
    };
};
const mapDispatchToProps = dispatch => ({
    setUser(data, history, param) {
        dispatch(doAuthentication(data, history, param));
    },
    tokenStillAvailable() {
        if (!tokenAvailable()) {
            dispatch(setCurrentUser({}));
            return false;
        }
        return true;
    },
    logout() {
        dispatch(logUserOut());
    },
    clearErrors() {
        dispatch(clearErrors());
    },
});

const WithCurrentUser = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default WithCurrentUser;
