/**
 * @since 2016-07-31 18:41
 * @author vivaxy
 */

import createAction from '../lib/createAction';
import * as actions from '../config/actions';

export default {
    setButtonDisabled: () => createAction({
        type: actions.BUTTON_DISABLED,
    }),
    setButtonDefault: () => createAction({
        type: actions.BUTTON_DEFAULT,
    }),
};
