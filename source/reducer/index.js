/**
 * @since 2016-08-01 21:50
 * @author vivaxy
 */

import { combineReducers } from 'redux';

import button from './button';
import newsList from './newsList';
import toastMessage from './toastMessage';

export default combineReducers({
    button,
    newsList,
    toastMessage,
});
