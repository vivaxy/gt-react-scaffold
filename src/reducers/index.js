/**
 * @since 2016-08-01 21:50
 * @author vivaxy
 */

import button from './button';
import newsList from './newsList';
import toast from './toast';
import pagination from './pagination';
import { routerReducer } from 'react-router-redux'

export default {
    button,
    newsList,
    toast,
    pagination,
    routing: routerReducer,
};
