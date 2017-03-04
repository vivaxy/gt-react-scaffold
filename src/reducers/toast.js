/**
 * @since 2016-08-25 09:31
 * @author vivaxy
 */

import createReducer from '../lib/createReducer';

import * as actionType from '../config/actions';

const defaultState = {
    show: false,
    message: '',
};

export default createReducer(defaultState, {
    [actionType.SHOW_TOAST]: (state, action) => {
        return {
            ...state,
            show: true,
            message: action.message,
        };
    },
    [actionType.HIDE_TOAST]: (state) => {
        return {
            ...state,
            show: false,
            message: '',
        };
    },
});
