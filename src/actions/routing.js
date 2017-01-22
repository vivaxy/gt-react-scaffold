/**
 * @since 2016-10-23 15:33
 * @author vivaxy
 */

import { push, replace, go, goBack, goForward } from 'react-router-redux'

import createAction from '../lib/createAction';

export default {
    push: (location) => createAction(push(location)),
    replace: (location) => createAction(replace(location)),
    go: (number) => createAction(go(number)),
    goBack: () => createAction(goBack()),
    goForward: () => createAction(goForward()),
};
