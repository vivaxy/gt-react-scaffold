/**
 * @since 2016-08-25 09:33
 * @author vivaxy
 */

import * as constant from '../config/actions';

export default {
    showToast: message => dispatch => dispatch({
        message,
        type: constant.SHOW_TOAST,
    }),
    hideToast: () => dispatch => dispatch({
        type: constant.HIDE_TOAST,
    }),
};
