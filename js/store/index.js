import {createStore} from 'redux';
import rootReducer from '../reducers';
import {compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {tokenStillValid, getUserFromToken, getUserToken, removeUserToken} from '../Utils';
import {setCurrentUser} from '../actions/actionCreators';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

function setUser() {
    const userToken = getUserToken();
    if (userToken) {
        if (tokenStillValid()) store.dispatch(setCurrentUser(getUserFromToken()));
        else {
            store.dispatch(setCurrentUser({}));
            removeUserToken();
        }
    }
}

setUser();

export default store;
