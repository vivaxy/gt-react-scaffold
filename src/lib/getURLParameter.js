/**
 * @since 2016-08-17 14:30
 * @author vivaxy
 */

import url from 'url';

export default (key, href = location.href) => {
    const o = url.parse(href, true);
    return o.query[key];
};
