/**
 * @since 2016-07-31 18:41
 * @author vivaxy
 */

import * as constant from '../constant/action';

export const setButtonDisabled = () => {
    return {
        type: constant.BUTTON_DISABLED
    };
};

export const setButtonDefault = () => {
    return {
        type: constant.BUTTON_DEFAULT
    };
};
