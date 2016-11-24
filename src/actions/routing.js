/**
 * @since 2016-10-23 15:33
 * @author vivaxy
 */

import { push, replace, go, goBack, goForward } from 'react-router-redux'

export default {
    push: (location) => (dispatch) => dispatch(push(location)),
    replace: (location) => (dispatch) => dispatch(replace(location)),
    go: (number) => (dispatch) => dispatch(go(number)),
    goBack: () => (dispatch) => dispatch(goBack()),
    goForward: () => (dispatch) => dispatch(goForward()),
};
