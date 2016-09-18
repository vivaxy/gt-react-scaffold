/**
 * @since 2016-09-16 18:11
 * @author vivaxy
 */

'use strict';

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import reducer from '../reducer';

const logger = createLogger();

const store = createStore(combineReducers(reducer), compose(
    applyMiddleware(logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducer', () => {
        const nextRootReducer = require('../reducer').default;
        store.replaceReducer(combineReducers(nextRootReducer));
    });
}

export default store;
