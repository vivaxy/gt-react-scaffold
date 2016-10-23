/**
 * @since 2016-10-23 15:44
 * @author vivaxy
 */

import Base from '../containers/Base';
import Demo from '../containers/Demo';
import Index from '../containers/Index';
import NoMatch from '../containers/NoMatch';

export default {
    path: '/',
    component: Base,
    indexRoute: {
        component: Index,
    },
    childRoutes: [
        {
            path: 'demo',
            component: Demo,
        },
        {
            path: '*',
            component: NoMatch,
        },
    ]
};
