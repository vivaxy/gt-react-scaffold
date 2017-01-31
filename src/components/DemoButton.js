/**
 * @since 2016-07-31 18:44
 * @author vivaxy
 */

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-pianist/Button';

export default class extends Component {

    static propTypes = {
        buttonDisabled: PropTypes.bool.isRequired,
        onLoadMore: PropTypes.func.isRequired,
    };

    render() {

        let {
            buttonDisabled,
        } = this.props;

        return <Button disabled={buttonDisabled} primary={true} onClick={::this.onClick}>{'load more'}</Button>
    }

    onClick() {

        let {
            onLoadMore,
        } = this.props;
        onLoadMore();
    }
}
