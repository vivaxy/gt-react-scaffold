/**
 * @since 2016-08-06 15:57
 * @author vivaxy
 */

export default (timeout) => {
    return new Promise((resolve) => {
        const timer = setTimeout(() => {
            return resolve(timer);
        }, timeout);
    });
};
