/**
 * @since 2016-09-03 09:16
 * @author vivaxy
 */

import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import connect from '../library/connect';
import setTitle from '../library/setTitle';
import * as entries from '../config/entries';

import Base from '../containers/Base';
import Demo from '../containers/Demo';
import Index from '../containers/Index';
import NoMatch from '../containers/NoMatch';

import i18n from '../i18n';

const routes = {
    path: '/',
    component: Base,
    indexRoute: {component: Index},
    childRoutes: [
        {
            path: 'demo',
            component: Demo,
        },
        {
            path: '*',
            component: NoMatch,
        },
    ]
};

export default class Entry extends Component {

    componentDidMount() {
        setTitle(i18n.SOMEONE_S_HOME('react-pianist'));
    }

    render() {
        return <Router history={browserHistory} routes={routes}/>
    }

}
