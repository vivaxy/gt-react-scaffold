/**
 * @since 2016-08-06 16:09
 * @author vivaxy
 */

import createAction from '../lib/createAction';
import * as actions from '../config/actions';

export default {
    appendNewsList: (list) => {
        return createAction({
            list,
            type: actions.APPEND_NEWS,
        });
    },
};
