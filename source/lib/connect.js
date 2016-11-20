/**
 * @since 2016-09-01 10:16
 * @author vivaxy
 */

import { connect } from 'react-redux';

import actions from '../actions';

export default (stateMapFunction, actionMap) => {
    return connect((state) => {
        return {
            ...stateMapFunction(state),
            toastState: state.toast,
        };
    }, {
        ...actionMap,
        showToastAction: actions.toast.showToast,
    });
};
