/**
 * @since 2016-06-11 15:43
 * @author vivaxy
 */

import * as environmentConstant from '../config/environments';

let env = environmentConstant.PRODUCTION;

const pathname = location.pathname;

if (pathname.startsWith('/release')) {
    env = environmentConstant.DEVELOPMENT;
}

export default env;
