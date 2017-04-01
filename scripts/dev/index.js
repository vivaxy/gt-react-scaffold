/**
 * @since 2017-04-01 16:30:03
 * @author vivaxy
 */

/* eslint-disable no-console */
import open from 'open';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from '../webpack.config';
import config from '../config';

const compiler = webpack(webpackConfig);

let opened = false;

const devServerOptions = {
    contentBase: [
        config.RELEASE_PATH,
        config.MOCK_SERVER_BASE,
    ],
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true,
    },
};

const server = new WebpackDevServer(compiler, devServerOptions);

const openBrowser = () => {
    const address = server.listeningApp.address();
    const url = `http://${address.address}:${address.port}`;
    console.log(`   server started: ${url}`);
    open(`${url}/html/index.html`);
};

compiler.plugin('done', () => {
    if (!opened) {
        opened = true;
        openBrowser();
    }
});

server.listen(config.DEVELOPMENT_PORT, config.DEVELOPMENT_IP, (err) => {
    if (err) {
        console.log(err);
    }
});

const stdIn = process.stdin;
stdIn.setEncoding('utf8');
stdIn.on('data', openBrowser);
