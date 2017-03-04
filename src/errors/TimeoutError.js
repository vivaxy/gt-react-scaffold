/**
 * @since 2016-06-05 11:40
 * @author vivaxy
 */

import * as constant from '../config/errors';

export default class TimeoutError extends Error {
    constructor(timeout) {
        super('timeout');
        this.timeout = timeout;
        this.name = constant.TIMEOUT;
    }
}

TimeoutError.create = (timeout) => {
    return new TimeoutError(timeout);
};
