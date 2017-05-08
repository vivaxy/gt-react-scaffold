/**
 * @since 2016-09-03 09:16
 * @author vivaxy
 */

import 'babel-polyfill';
import page from '../pages/about';

page();

/* eslint-disable global-require */
if (module.hot) {
    module.hot.accept('../pages/about', () => {
        const newPage = require('../pages/about').default;
        newPage();
    });
}
