/**
 * @since 2016-07-31 19:09
 * @author vivaxy
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, combineReducers } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import setStyle from '../library/style';

class App extends Component {

    constructor() {
        super();
    }

    render() {
        let {reducers, children} = this.props;
        let store = createStore(reducers, window.devToolsExtension && window.devToolsExtension());

        if (module.hot) {
            // Enable Webpack hot module replacement for reducers
            module.hot.accept('../reducer', () => {
                const nextRootReducer = require('../reducer').default;
                store.replaceReducer(nextRootReducer);
            });
        }

        return <Provider store={store}>
            {children}
        </Provider>;
    }
}

let renderApp = (Entry, reducers = {}, element = document.getElementById('app')) => {
    injectTapEventPlugin();
    setStyle();

    let combinedReducers = combineReducers({
        ...reducers
    });

    return render(
        <App reducers={combinedReducers}>
            <MuiThemeProvider>
                <Entry />
            </MuiThemeProvider>
        </App>,
        element
    );
};

export default renderApp;
