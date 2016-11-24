/**
 * @since 2016-08-06 16:09
 * @author vivaxy
 */

import * as actions from '../config/actions';

export default {
    appendNewsList: list => dispatch => dispatch({
        list,
        type: actions.APPEND_NEWS,
    }),
};
