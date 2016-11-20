/**
 * @since 2016-08-06 16:07
 * @author vivaxy
 */

import createReducer from '../lib/createReducer';

import * as constant from '../config/actions';

const defaultState = [];

export default createReducer(defaultState, {
    [constant.APPEND_NEWS]: (state, action) => {
        return [...state, ...action.list];
    },
});
