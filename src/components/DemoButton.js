/**
 * @since 2016-07-31 18:44
 * @author vivaxy
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-pianist/Button';

export default class extends Component {

    static propTypes = {
        buttonDisabled: PropTypes.bool.isRequired,
        onLoadMore: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.onClick = ::this.onClick;
    }

    onClick() {
        const {
            onLoadMore,
        } = this.props;
        onLoadMore();
    }

    render() {
        const {
            buttonDisabled,
        } = this.props;

        return <Button disabled={buttonDisabled} primary onClick={this.onClick}>{'load more'}</Button>;
    }

}
