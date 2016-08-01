/**
 * @since 2016-07-31 18:41
 * @author vivaxy
 */

import * as constant from '../constant';

export const setButtonLoading = () => {
    return {
        type: constant.BUTTON_LOADING
    };
};

export const setButtonDefault = () => {
    return {
        type: constant.BUTTON_DEFAULT
    };
};
