import React, { Component } from 'react';

import connect from '../library/connect';
import setTitle from '../library/setTitle';

import PianistDemo from '../components/pianist-demo';

import i18n from '../i18n';

class Index extends Component {

    render () {

        const {
            params,
        } = this.props;

        setTitle(i18n.SOMEONE_S_HOME('react-pianist'));

        return <PianistDemo index={Number(params.index)}/>
    }

}

export default connect(state => ({}), {})(Index);
