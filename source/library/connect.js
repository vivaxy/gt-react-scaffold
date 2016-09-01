/**
 * @since 2016-09-01 10:16
 * @author vivaxy
 */

import { connect } from 'react-redux';

import action from '../action';

export default (stateMapFunction, actionMap) => {
    return connect((state) => {
        return {
            ...stateMapFunction(state),
            toastState: state.toast,
        };
    }, {
        ...actionMap,
        showToastAction: action.toast.showToast,
    });
};
