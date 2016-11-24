/**
 * @since 2016-09-01 08:18
 * @author vivaxy
 */

import React, { Component, cloneElement } from 'react';
import { connect } from 'react-redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import actions from '../../actions';
import Toast from './Toast';

class Base extends Component {

    render() {

        let {
            children,
            toastState,
            hideToastAction,
            location,
        } = this.props;

        return <MuiThemeProvider>
            <div>
                <ReactCSSTransitionGroup
                    component='div'
                    transitionName='page-transition'
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {cloneElement(children, {
                        key: location.pathname,
                    })}
                </ReactCSSTransitionGroup>
                <Toast
                    toastState={toastState}
                    hideToastAction={hideToastAction}
                />
            </div>
        </MuiThemeProvider>
    }

}

export default connect(state => ({}), {
    hideToastAction: actions.toast.hideToast,
})(Base);
