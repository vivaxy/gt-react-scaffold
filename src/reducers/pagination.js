/**
 * @since 2016-08-31 17:11
 * @author vivaxy
 */

import { PropTypes } from 'react';

import createReducer from '../lib/createReducer';

import * as constant from '../config/actions';

const defaultState = {
    pageIndex: 0,
    pageSize: 0,
    pageCount: 0,
    rowCount: 0,
    needMore: true,
};

export default createReducer(defaultState, {
    [constant.SETUP_PAGINATION]: (state, action) => {
        return {
            ...state,
            pageSize: action.pageSize,
            pageIndex: action.pageIndex,
            pageCount: action.pageCount,
            rowCount: action.rowCount,
            needMore: action.pageIndex !== action.pageCount,
        };
    },
});

export const propTypes = PropTypes.shape({
    pageIndex: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    rowCount: PropTypes.number.isRequired,
    needMore: PropTypes.bool.isRequired,
});
