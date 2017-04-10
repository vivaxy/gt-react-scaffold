/**
 * @since 2016-09-16 18:11
 * @author vivaxy
 */

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';
import thunk from 'redux-thunk';

import reducers from '../redux/reducers';

const routing = routerMiddleware(hashHistory);

const store = createStore(combineReducers(reducers), compose(
    applyMiddleware(thunk, routing),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f, // eslint-disable-line arrow-body-style
));

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../redux/reducers', () => {
        const nextRootReducer = require('../redux/reducers').default; // eslint-disable-line global-require
        store.replaceReducer(combineReducers(nextRootReducer));
    });
}

export default store;
