/**
 * @since 2016-07-31 18:38
 * @author vivaxy
 */

import render, {renderWithEntry} from '../library/render';
import Demo from '../container/Demo';

render(Demo);

if (module.hot) {
    module.hot.accept(`../container/Demo`, () => {
        const NewEntry = require(`../container/Demo`).default;
        renderWithEntry(NewEntry);
    });
}
