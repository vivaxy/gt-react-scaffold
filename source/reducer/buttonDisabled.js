/**
 * @since 2016-07-31 18:40
 * @author vivaxy
 */

import * as constant from '../constant/action';

export default (state = true, action) => {
    switch (action.type) {
        case constant.BUTTON_DEFAULT:
            return false;
        default:
            return true;
    }
};
