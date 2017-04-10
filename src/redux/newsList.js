/**
 * @since 2016-08-06 16:07
 * @author vivaxy
 */

import createReducer from '../lib/createReducer';

const APPEND_NEWS = 'APPEND_NEWS';

const defaultState = [];

export default createReducer(defaultState, {
    [APPEND_NEWS]: (state, action) => {
        return [...state, ...action.list];
    },
});

export const appendNewsList = (list) => {
    return {
        list,
        type: APPEND_NEWS,
    };
};
