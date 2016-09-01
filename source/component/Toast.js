/**
 * @since 2016-08-06 16:56
 * @author vivaxy
 */

import React, { Component, PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';

import * as toastConfig from '../config/toast';

export default class Toast extends Component {

    render () {

        let {
            toastState,
        } = this.props;

        return <div>
            <Snackbar
                open={toastState.show}
                message={toastState.message}
                autoHideDuration={toastConfig.AUTO_HIDE_DURATION}
                onRequestClose={::this.onClose}
            />
        </div>
    }

    onClose () {
        let {
            hideToastAction,
        } = this.props;
        hideToastAction();
    }

}

Toast.propTypes = {
    toastState: PropTypes.shape({
        show: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired,
    }),
    hideToastAction: PropTypes.func.isRequired,
};
