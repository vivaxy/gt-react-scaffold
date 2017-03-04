/**
 * @since 2016-09-01 08:18
 * @author vivaxy
 */

import React, { Component, PropTypes, cloneElement } from 'react';
import { connect } from 'react-redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import actions from '../../actions';
import Toast from './Toast';

import './Base.less';

class Base extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        toastState: PropTypes.bool.isRequired,
        hideToastAction: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
    };

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

        return (
            <div>
                <ReactCSSTransitionGroup
                    component="div"
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
        );
    }

}

export default connect(() => {
    return {};
}, {
    hideToastAction: actions.toast.hideToast,
})(Base);
