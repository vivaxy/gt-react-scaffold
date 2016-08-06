/**
 * @since 2016-07-31 18:41
 * @author vivaxy
 */

import fetch from '../library/fetch';

export default async () => {

    let result = await fetch({
        url: '/news-by-page',
        data: ''
    });

    result = await result.json();

    return result.list;

};
