/**
 * @since 2017-04-10 09:55:20
 * @author vivaxy
 */

import {
    push as routerPush,
    replace as routerReplace,
    go as routerGo,
    goBack as routerGoBack,
    goForward as routerGoFroward,
} from 'react-router-redux';

export const push = (location) => {
    return routerPush(location);
};
export const replace = (location) => {
    return routerReplace(location);
};
export const go = (number) => {
    return routerGo(number);
};
export const goBack = () => {
    return routerGoBack();
};
export const goForward = () => {
    return routerGoFroward();
};
