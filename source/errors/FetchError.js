/**
 * @since 2016-06-05 11:40
 * @author vivaxy
 */

import * as constant from '../config/errors';

export default class FetchError extends Error {
    constructor (response) {
        super(response.statusText);
        this.response = response;
        this.name = constant.FETCH;
    }
}

FetchError.create = (response) => {
    return new FetchError(response);
};
