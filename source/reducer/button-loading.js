/**
 * @since 2016-07-31 18:40
 * @author vivaxy
 */

import * as constant from '../constant';

let buttonLoading = (state = true, action) => {
    switch (action.type) {
        case constant.BUTTON_LOADING:
            return false;
        case constant.BUTTON_DEFAULT:
            return true;
        default:
            return true;
    }
};

export default buttonLoading;
