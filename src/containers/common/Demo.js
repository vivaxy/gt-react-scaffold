import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import setTitle from '../../lib/setTitle';

import PianistDemo from '../../components/pianist-demo';

import i18n from '../../i18n';

class Index extends Component {

    static propTypes = {
        params: PropTypes.object.isRequired,
    };

    componentDidMount() {
        setTitle(i18n.$SOMEONE_S_HOME('react-pianist'));
    }

    render() {
        const {
            params,
        } = this.props;

        return (
            <div className="page-wrapper">
                <PianistDemo index={Number(params.index)} />
            </div>
        );
    }

}

export default connect(() => {
    return {};
}, {})(Index);
