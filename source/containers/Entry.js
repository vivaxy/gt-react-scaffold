/**
 * @since 2016-09-03 09:16
 * @author vivaxy
 */

import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import setTitle from '../library/setTitle';
import store from '../library/store';
import routes from '../entries/routes';

import i18n from '../i18n';

const history = syncHistoryWithStore(browserHistory, store);

export default class Entry extends Component {

    componentDidMount() {
        setTitle(i18n.SOMEONE_S_HOME('react-pianist'));
    }

    render() {
        return <Router history={history} routes={routes}/>
    }

}
