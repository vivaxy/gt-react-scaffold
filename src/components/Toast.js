/**
 * @since 2016-08-06 16:56
 * @author vivaxy
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoHideToast } from 'react-pianist/Toast';

import * as toastConfig from '../config/toast';

export default class extends Component {

    static propTypes = {
        toastState: PropTypes.shape({
            show: PropTypes.bool.isRequired,
            message: PropTypes.string.isRequired,
        }).isRequired,
        hideToastAction: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.onClose = ::this.onClose;
    }

    onClose() {
        const {
            hideToastAction,
        } = this.props;
        hideToastAction();
    }

    render() {
        const {
            toastState,
        } = this.props;

        return (
            <AutoHideToast
                show={toastState.show}
                autoHideDuration={toastConfig.AUTO_HIDE_DURATION}
                onAutoHide={this.onClose}
            >
                {toastState.message}
            </AutoHideToast>
        );
    }

}
