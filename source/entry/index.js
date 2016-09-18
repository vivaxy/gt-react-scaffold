/**
 * @since 2016-09-03 09:16
 * @author vivaxy
 */

import React, { Component } from 'react';

import connect from '../library/connect';
import render from '../library/render';
import setTitle from '../library/setTitle';

import PianistDemo from '../component/pianist-demo';

import i18n from '../i18n';

@connect(state => ({}), {})
class Index extends Component {

    render () {

        setTitle(i18n.SOMEONE_S_HOME('react-pianist'));

        return <PianistDemo/>
    }

}

render(Index);
