/**
 * @since 2016-10-23 15:44
 * @author vivaxy
 */

import Base from '../containers/Base';
import Demo from '../containers/Demo';
import Index from '../containers/Index';
import NoMatch from '../containers/NoMatch';

import * as routes from '../config/routes';

export default {
    path: routes.BASE,
    component: Base,
    indexRoute: {
        component: Index,
    },
    childRoutes: [
        {
            path: routes.DEMO,
            component: Demo,
        },
        {
            path: routes.WILDCARD,
            component: NoMatch,
        },
    ]
};
