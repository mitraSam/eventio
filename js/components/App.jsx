import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from '../store';
import AppRouter from './AppRoutes';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <AppRouter />
                </Provider>
            </BrowserRouter>
        );
    }
}

export default App;
