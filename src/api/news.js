/**
 * @since 2016-07-31 18:41
 * @author vivaxy
 */

import fetch from '../lib/fetch';

export default async () => {

    let result = await fetch({
        url: '/newsByPage',
        data: Math.random()
    });

    return result.list;

};
