/**
 * @since 2016-08-14 13:48
 * @author vivaxy
 */

import * as environmentConstant from '../constant/environment';

import environment from './environment';

const MOCK_API_ROOT = `/mock-server/api`;

export default (url) => {
    let requestPath = '';
    switch (environment) {
        case environmentConstant.DEVELOPMENT:
            requestPath = `${MOCK_API_ROOT}${url}.json`;
            break;
        case environmentConstant.PRODUCTION:
            requestPath = `${MOCK_API_ROOT}${url}.json`;
            break;
        default:
            break;
    }
    return requestPath;
};
