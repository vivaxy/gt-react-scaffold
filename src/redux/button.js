/**
 * @since 2016-07-31 18:40
 * @author vivaxy
 */

import { createReducer } from 'redux-create-reducer';

import { BUTTON_DEFAULT, BUTTON_DISABLED, APPEND_NEWS } from '../config/actionTypes';

const defaultState = true;

export default createReducer(defaultState, {
    [BUTTON_DISABLED]: () => {
        return false;
    },
    [BUTTON_DEFAULT]: () => {
        return true;
    },
    [APPEND_NEWS]: () => {
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
