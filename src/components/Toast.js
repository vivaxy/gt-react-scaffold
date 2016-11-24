/**
 * @since 2016-08-06 16:56
 * @author vivaxy
 */

import React, { Component, PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';

import * as toastConfig from '../config/toast';

export default class extends Component {

    static propTypes = {
        toastState: PropTypes.shape({
            show: PropTypes.bool.isRequired,
            message: PropTypes.string.isRequired,
        }),
        hideToastAction: PropTypes.func.isRequired,
    };

    render () {

        let {
            toastState,
        } = this.props;

        // todo bindAutoBindMethods.js:50 Uncaught TypeError: Cannot read property '__reactAutoBindMap' of null
        return <Snackbar
            open={toastState.show}
            message={toastState.message}
            autoHideDuration={toastConfig.AUTO_HIDE_DURATION}
            onRequestClose={::this.onClose}
        />
    }

    onClose () {
        let {
            hideToastAction,
        } = this.props;
        hideToastAction();
    }

}
