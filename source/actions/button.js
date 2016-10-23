/**
 * @since 2016-07-31 18:41
 * @author vivaxy
 */

import * as actions from '../config/actions';

export default {
    setButtonDisabled: () => dispatch => dispatch({
        type: actions.BUTTON_DISABLED,
    }),
    setButtonDefault: () => dispatch => dispatch({
        type: actions.BUTTON_DEFAULT,
    }),
};
