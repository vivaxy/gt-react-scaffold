/**
 * @since 2016-08-25 09:33
 * @author vivaxy
 */

import * as constant from '../constant/action';

export const toastMessage = (message) => {
    return {
        type: constant.BUTTON_DISABLED,
        message
    };
};
