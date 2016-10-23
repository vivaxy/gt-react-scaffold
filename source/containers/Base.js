/**
 * @since 2016-09-01 08:18
 * @author vivaxy
 */

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import connect from '../library/connect';
import action from '../actions';
import Toast from '../components/Toast';

class Base extends Component {

    render() {

        let {
            children,
            toastState,
            hideToastAction,
        } = this.props;

        return <MuiThemeProvider>
            <div>
                <div>
                    {children}
                </div>
                <Toast
                    toastState={toastState}
                    hideToastAction={hideToastAction}
                />
            </div>
        </MuiThemeProvider>
    }

}

export default connect(state => ({}), {
    hideToastAction: action.toast.hideToast,
})(Base);
