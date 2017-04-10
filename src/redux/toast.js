/**
 * @since 2016-08-25 09:31
 * @author vivaxy
 */

import createReducer from '../lib/createReducer';

const SHOW_TOAST = 'SHOW_TOAST';
const HIDE_TOAST = 'HIDE_TOAST';

const defaultState = {
    show: false,
    message: '',
};

export default createReducer(defaultState, {
    [SHOW_TOAST]: (state, action) => {
        return {
            ...state,
            show: true,
            message: action.message,
        };
    },
    [HIDE_TOAST]: (state) => {
        return {
            ...state,
            show: false,
            message: '',
        };
    },
});

export const showToast = (message) => {
    return {
        message,
        type: SHOW_TOAST,
    };
};

export const hideToast = () => {
    return {
        type: HIDE_TOAST,
    };
};
