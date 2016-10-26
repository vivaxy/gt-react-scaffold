/**
 * @since 2016-08-14 13:48
 * @author vivaxy
 */

import * as environmentConstant from '../config/environments';

import environment from './environment';

const MOCK_API_ROOT = `/api`;

export default (url) => {
    let requestPath = '';
    switch (environment) {
        case environmentConstant.DEVELOPMENT:
            requestPath = `${MOCK_API_ROOT}${url}.json`;
            break;
        case environmentConstant.PRODUCT:
            requestPath = `${MOCK_API_ROOT}${url}.json`;
            break;
        default:
            break;
    }
    return requestPath;
};
