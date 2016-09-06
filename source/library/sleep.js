/**
 * @since 2016-08-06 15:57
 * @author vivaxy
 */

export default (timeout, getTimer = () => {
}) => {
    return new Promise((resolve) => {
        const timer = setTimeout(resolve, timeout);
        getTimer(timer);
    });
};
