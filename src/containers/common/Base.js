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

import './Base.less';

class Base extends Component {

    render() {

        const {
            children,
            toastState,
            hideToastAction,
            location,
        } = this.props;

        const {
            action,
            pathname,
        } = location;

        const transitionName = `page-transition-${action.toLowerCase()}`;

        return <MuiThemeProvider>
            <div>
                <ReactCSSTransitionGroup
                    component='div'
                    transitionName={transitionName}
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {cloneElement(children, {
                        key: pathname,
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
