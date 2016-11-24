/**
 * @since 2016-08-25 09:33
 * @author vivaxy
 */

import * as actions from '../config/actions';

export default {
    showToast: message => dispatch => dispatch({
        message,
        type: actions.SHOW_TOAST,
    }),
    hideToast: () => dispatch => dispatch({
        type: actions.HIDE_TOAST,
    }),
};
