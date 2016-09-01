/**
 * @since 2016-09-01 12:57
 * @author vivaxy
 */

import * as constant from '../config/error';

export default class ServerError extends Error {
    constructor (response) {
        super(response.message);
        this.response = response;
        this.name = constant.SERVER;
    }
}

ServerError.create = (response) => {
    return new ServerError(response);
};
