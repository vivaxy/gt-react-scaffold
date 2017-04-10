/**
 * @since 2016-08-06 16:07
 * @author vivaxy
 */

import createReducer from '../lib/createReducer';
import processErrors from '../lib/processErrors';

import { APPEND_NEWS } from '../config/actionTypes';
import { setButtonDisabled, setButtonDefault } from './button';
import getNewsAPI from '../api/news';

const defaultState = [];

export default createReducer(defaultState, {
    [APPEND_NEWS]: (state, action) => {
        return [...state, ...action.list];
    },
});

export const getMoreNews = () => {
    return async(dispatch) => {
        try {
            dispatch(setButtonDisabled());
            const list = await getNewsAPI();
            dispatch({
                list,
                type: APPEND_NEWS,
            });
        } catch (ex) {
            dispatch(setButtonDefault());
            processErrors(ex);
        }
    };
};
