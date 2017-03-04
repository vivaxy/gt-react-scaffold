/**
 * @since 2016-10-24 08:47
 * @author vivaxy
 */

import test from 'ava';
import path from 'path';

test('project base directory name', (t) => {
    const paths = path.resolve(__dirname, '..');
    t.true(paths === process.cwd());
});
