/**
 * @since 2016-07-31 18:41
 * @author vivaxy
 */

import * as constant from '../config/actions';

export default {
    setButtonDisabled: () => dispatch => dispatch({
        type: constant.BUTTON_DISABLED,
    }),
    setButtonDefault: () => dispatch => dispatch({
        type: constant.BUTTON_DEFAULT,
    }),
};
