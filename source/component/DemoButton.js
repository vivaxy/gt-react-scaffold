/**
 * @since 2016-07-31 18:44
 * @author vivaxy
 */

import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class DemoButton extends Component {

    static propTypes = {
        buttonDisabled: PropTypes.bool.isRequired,
        onLoadMore: PropTypes.func.isRequired,
    };

    render() {

        let {
            buttonDisabled,
        } = this.props;

        return <RaisedButton label='load more' disabled={buttonDisabled} primary={true} onClick={::this.onClick}/>
    }

    onClick() {

        let {
            onLoadMore,
        } = this.props;
        onLoadMore();
    }
}
