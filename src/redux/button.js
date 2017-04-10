/**
 * @since 2016-07-31 18:40
 * @author vivaxy
 */

import createReducer from '../lib/createReducer';

const BUTTON_DISABLED = 'BUTTON_DISABLED';
const BUTTON_DEFAULT = 'BUTTON_DEFAULT';

const defaultState = true;

export default createReducer(defaultState, {
    [BUTTON_DISABLED]: () => {
        return false;
    },
    [BUTTON_DEFAULT]: () => {
        return true;
    },
});

export const setButtonDisabled = () => {
    return {
        type: BUTTON_DISABLED,
    };
};

export const setButtonDefault = () => {
    return {
        type: BUTTON_DEFAULT,
    };
};
