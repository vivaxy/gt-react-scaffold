/**
 * @since 2016-08-31 17:11
 * @author vivaxy
 */

import PropTypes from 'prop-types';

import createReducer from '../lib/createReducer';

const SETUP_PAGINATION = 'SETUP_PAGINATION';

const defaultState = {
    pageIndex: 0,
    pageSize: 0,
    pageCount: 0,
    rowCount: 0,
    needMore: true,
};

export default createReducer(defaultState, {
    [SETUP_PAGINATION]: (state, action) => {
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
