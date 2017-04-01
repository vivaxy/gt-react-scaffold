/**
 * @since 2017-04-01 16:33:18
 * @author vivaxy
 */

/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config';

const compiler = webpack(webpackConfig);

compiler.run((err) => {
    if (err) {
        console.error(err);
    }
});
