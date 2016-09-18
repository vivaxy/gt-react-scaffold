import React, { Component } from 'react';

import connect from '../library/connect';
import setTitle from '../library/setTitle';

import PianistDemo from '../component/pianist-demo';

import i18n from '../i18n';

@connect(state => ({}), {})
export default class Index extends Component {

    render () {

        setTitle(i18n.SOMEONE_S_HOME('react-pianist'));

        return <PianistDemo/>
    }

}