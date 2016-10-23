/**
 * @since 2016-07-31 19:09
 * @author vivaxy
 */

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component, Children, createElement } from 'react';

import setStyle from './style';
import store from './store';

const ID_SELECTOR = 'react-scaffold';
const history = syncHistoryWithStore(browserHistory, store);

injectTapEventPlugin();

// hack around https://github.com/gaearon/react-hot-boilerplate/pull/61#issuecomment-211504531
Router.prototype.componentWillReceiveProps = function(nextProps) {
    let components = [];
    function grabComponents(element) {
        // This only works for JSX routes, adjust accordingly for plain JS config
        if (element.props && element.props.component) {
            components.push(element.props.component);
        }
        if (element.props && element.props.children) {
            Children.forEach(element.props.children, grabComponents);
        }
    }
    grabComponents(nextProps.routes || nextProps.children);
    components.forEach(createElement); // force patching
};

export const renderWithRoutes = (routes) => {
    return render(
        <AppContainer>
            <Provider store={store}>
                <Router history={history} routes={routes}/>
            </Provider>
        </AppContainer>,
        document.getElementById(ID_SELECTOR)
    );
};

export default (routes) => {

    setStyle();

    renderWithRoutes(routes);

};
