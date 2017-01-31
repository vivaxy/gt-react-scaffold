/**
 * @since 2016-08-06 16:56
 * @author vivaxy
 */

import React, { Component, PropTypes } from 'react';
import { AutoHideToast } from 'react-pianist/Toast';

import * as toastConfig from '../config/toast';

export default class extends Component {

    static propTypes = {
        toastState: PropTypes.shape({
            show: PropTypes.bool.isRequired,
            message: PropTypes.string.isRequired,
        }),
        hideToastAction: PropTypes.func.isRequired,
    };

    render() {

        let {
            toastState,
        } = this.props;

        return <AutoHideToast
            show={toastState.show}
            autoHideDuration={toastConfig.AUTO_HIDE_DURATION}
            onAutoHide={::this.onClose}
        >{toastState.message}</AutoHideToast>
    }

    onClose() {
        let {
            hideToastAction,
        } = this.props;
        hideToastAction();
    }

}
