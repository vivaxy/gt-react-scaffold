/**
 * @since 2016-08-06 16:09
 * @author vivaxy
 */

import * as constant from '../config/actions';

export default {
    appendNewsList: list => dispatch => dispatch({
        list,
        type: constant.APPEND_NEWS,
    }),
};
