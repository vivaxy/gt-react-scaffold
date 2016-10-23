/**
 * @since 2016-09-03 09:16
 * @author vivaxy
 */

import render, { renderWithEntry } from '../library/render';
import Entry from '../containers/Entry';

render(Entry);

if (module.hot) {
    module.hot.accept(`../containers/Entry`, () => {
        const NewEntry = require(`../containers/Entry`).default;
        renderWithEntry(NewEntry);
    });
}
