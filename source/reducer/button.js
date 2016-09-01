/**
 * @since 2016-07-31 18:40
 * @author vivaxy
 */

import createReducer from '../library/createReducer';

import * as constant from '../config/action';

const defaultState = true;

export default createReducer(defaultState, {
    [constant.BUTTON_DISABLED]: (state, action) => {
        return false;
    },
    [constant.BUTTON_DEFAULT]: (state, action) => {
        return true;
    },
});
