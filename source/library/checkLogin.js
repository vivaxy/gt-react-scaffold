/**
 * @since 2016-09-01 13:14
 * @author vivaxy
 */

import cookie from 'tiny-cookie';

import * as cookieKey from '../config/cookie';
import * as storageKey from '../config/storage';

const get = (key) => {
    return localStorage.getItem(key);
};

export default (setLoginInfoAction) => {
    let login = false;
    if (cookie.get(cookieKey.LOGIN_TOKEN)) {
        // get user info from localStorage
        setLoginInfoAction({
            id: get(storageKey.USER_ID),
            name: get(storageKey.USER_NAME),
            avatar: get(storageKey.USER_AVATAR),
        });
        login = true;
    }
    return login;
};
