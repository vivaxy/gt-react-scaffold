/**
 * @since 2016-09-01 08:18
 * @author vivaxy
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import action from '../action';
import Toast from '../component/Toast';

@connect(state => ({
    toastState: state.toast,
}), {
    hideToastAction: action.toast.hideToast,
})
export default class EntryWrapper extends Component {

    render () {

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
