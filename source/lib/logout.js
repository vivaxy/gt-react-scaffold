/**
 * @since 2016-08-27 10:27
 * @author vivaxy
 */

import cookie from 'tiny-cookie';

import * as cookieKey from '../config/cookie';
import * as storageKey from '../config/storage';

export default () => {
    cookie.remove(cookieKey.LOGIN_TOKEN);
};
