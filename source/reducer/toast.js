/**
 * @since 2016-08-25 09:31
 * @author vivaxy
 */

import createReducer from '../library/createReducer';

import * as actionType from '../config/action';

const defaultState = '';

export default createReducer(defaultState, {
    [actionType.SHOW_TOAST]: (state, action) => {
        return action.message;
    },
    [actionType.HIDE_TOAST]: (state, action) => {
        return '';
    },
});
