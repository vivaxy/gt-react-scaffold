/**
 * @since 2016-09-01 08:17
 * @author vivaxy
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as errorType from '../config/error';
import action from '../action';

@connect(state => ({
    toastState: state.toast,
}), {
    showToastAction: action.toast.showToast,
    hideToastAction: action.toast.hideToast,
})
export default class BaseComponent extends Component {

    constructor (props, content, updater) {
        super(props, content, updater);
    }

    async invokeApi (api, ...argumentList) {

        let {
            showToastAction,
        } = this.props;

        try {
            return await api(argumentList);
        } catch (ex) {
            switch (ex.name) {
                case errorType.FETCH:
                    showToastAction(ex.message);
                    break;
                default:
                    throw ex;
                    break;
            }
        }
    }

}

console.log(BaseComponent);
