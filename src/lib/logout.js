/**
 * @since 2016-08-27 10:27
 * @author vivaxy
 */

import cookie from 'tiny-cookie';

import * as cookieKey from '../config/cookie';

export default () => {
    cookie.remove(cookieKey.LOGIN_TOKEN);
};
