/**
 * @since 2016-08-27 10:27
 * @author vivaxy
 */

import cookie from 'tiny-cookie';

import * as cookieKey from '../constant/cookie';
import * as storageKey from '../constant/storage';

export default () => {
    cookie.remove(cookieKey.LOGIN_TOEKN);
};
