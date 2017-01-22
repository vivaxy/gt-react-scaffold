/**
 * @since 2016-08-25 09:33
 * @author vivaxy
 */

import createAction from '../lib/createAction';

import * as actions from '../config/actions';

export default {
    showToast: message => createAction({
        message,
        type: actions.SHOW_TOAST,
    }),
    hideToast: () => createAction({
        type: actions.HIDE_TOAST,
    }),
};
