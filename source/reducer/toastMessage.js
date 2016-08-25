/**
 * @since 2016-08-25 09:31
 * @author vivaxy
 */

import createReducer from '../library/createReducer';

import * as constant from '../constant/action';

const defaultState = '';

export default createReducer(defaultState, {
    [constant.TOAST_MESSAGE]: (state, action) => {
        return action.message;
    }
});
