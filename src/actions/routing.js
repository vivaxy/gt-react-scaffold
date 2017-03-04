/**
 * @since 2016-10-23 15:33
 * @author vivaxy
 */

import { push, replace, go, goBack, goForward } from 'react-router-redux';

import createAction from '../lib/createAction';

export default {
    push: (location) => {
        return createAction(push(location));
    },
    replace: (location) => {
        return createAction(replace(location));
    },
    go: (number) => {
        return createAction(go(number));
    },
    goBack: () => {
        return createAction(goBack());
    },
    goForward: () => {
        return createAction(goForward());
    },
};
