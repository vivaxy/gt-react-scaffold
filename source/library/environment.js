/**
 * @since 2016-06-11 15:43
 * @author vivaxy
 */

import * as environmentConstant from '../constant/environment';

let env = environmentConstant.PRODUCTION;

let host = location.host;

if (host === '127.0.0.1:8080') {
    env = environmentConstant.DEVELOPMENT;
}

export default env;
