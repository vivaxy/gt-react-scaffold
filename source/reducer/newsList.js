/**
 * @since 2016-08-06 16:07
 * @author vivaxy
 */

import * as constant from '../constant/action';

export default (state = [], action) => {
    switch (action.type) {
        case constant.APPEND_NEWS:
            return state.concat(action.list);
        default:
            return state.concat();
    }
};
