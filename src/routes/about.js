/**
 * @since 2016-10-24 09:02
 * @author vivaxy
 */

import Base from '../containers/common/Base';
import NoMatch from '../containers/common/NoMatch';
import Index from '../containers/Index/Home';
import Demo from '../containers/Demo/PianistDemo';

const demoRoute = {
    path: 'demo/:index',
    component: Demo,
};

const noMatchRoute = {
    path: '*',
    component: NoMatch,
};

const route = {
    path: '/',
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
