/**
 * @since 2016-09-03 09:16
 * @author vivaxy
 */

import render, { renderWithRoutes } from '../library/render';
import routes from './routes';

render(routes);

if (module.hot) {
    module.hot.accept(`./routes`, () => {
        const newRoutes = require(`./routes`).default;
        renderWithRoutes(newRoutes);
    });
}
