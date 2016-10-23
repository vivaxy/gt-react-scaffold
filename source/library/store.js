/**
 * @since 2016-09-16 18:11
 * @author vivaxy
 */

'use strict';

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const logger = createLogger();
const routing = routerMiddleware(browserHistory);

const store = createStore(combineReducers(reducers), compose(
    applyMiddleware(thunk, logger, routing),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers').default;
        store.replaceReducer(combineReducers(nextRootReducer));
    });
}

export default store;
