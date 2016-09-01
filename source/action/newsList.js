/**
 * @since 2016-08-06 16:09
 * @author vivaxy
 */

import * as constant from '../config/action';

export const appendNewsList = (list) => {
    return {
        type: constant.APPEND_NEWS,
        list
    };
};
