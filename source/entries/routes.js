/**
 * @since 2016-10-23 15:44
 * @author vivaxy
 */

import Base from '../containers/Base';
import NoMatch from '../containers/NoMatch';
import Index from '../containers/Index';
import Demo from '../containers/Demo';

import * as routes from '../config/routes';

const demoRoute = {
    path: `${routes.DEMO}/:index`,
    component: Demo,
};

const noMatchRoute = {
    path: routes.WILDCARD,
    component: NoMatch,
};

const route = {
    path: routes.BASE,
    component: Base,
    indexRoute: {
        component: Index,
    },
    childRoutes: [
        demoRoute,
        noMatchRoute,
    ],
};

export default route;
