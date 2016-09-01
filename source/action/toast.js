/**
 * @since 2016-08-25 09:33
 * @author vivaxy
 */

import * as constant from '../config/action';

export const showToast = (message) => {
    return {
        type: constant.SHOW_TOAST,
        message
    };
};

export const hideToast = () => {
    return {
        type: constant.HIDE_TOAST
    };
};
