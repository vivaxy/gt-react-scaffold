/**
 * @since 2016-09-03 09:16
 * @author vivaxy
 */

import page from '../pages/index';

page();

/* eslint-disable global-require */
if (module.hot) {
    module.hot.accept('../pages/index', () => {
        const newPage = require('../pages/index').default;
        newPage();
    });
}
