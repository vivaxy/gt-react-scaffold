/**
 * @since 2016-09-01 08:18
 * @author vivaxy
 */

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Toast from './Toast';

import './Base.less';

class Base extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        location: PropTypes.object.isRequired,
    };

    render() {
        const {
            children,
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
                <Toast />
            </div>
        );
    }
}

export default connect(null, {})(Base);
