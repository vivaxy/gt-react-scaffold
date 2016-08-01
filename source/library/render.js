/**
 * @since 2016-07-31 19:09
 * @author vivaxy
 */

import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, compose} from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const NOOP = () => {
};

class App extends Component {
    constructor () {
        super();
    }

    render () {
        let {reducers} = this.props;
        let store = createStore(reducers, window.devToolsExtension && window.devToolsExtension());

        if (module.hot) {
            // Enable Webpack hot module replacement for reducers
            module.hot.accept('../reducer', () => {
                console.log(arguments);
                const nextRootReducer = require('../reducer').default;
                store.replaceReducer(nextRootReducer);
            });
        }

        return <Provider store={store}>
            {this.props.children}
        </Provider>;
    }
}

let renderApp = (Entry, reducers = NOOP, element = document.getElementById('app')) => {
    injectTapEventPlugin();
    return render(
        <App reducers={reducers}>
            <MuiThemeProvider>
                <Entry />
            </MuiThemeProvider>
        </App>,
        element
    );
};

export default renderApp;
