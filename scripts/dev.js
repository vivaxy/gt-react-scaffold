/**
 * @since 2017-01-12 17:35
 * @author vivaxy
 */

/* eslint-disable no-console */
const open = require('open');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('../webpack.config');
const config = require('./config');

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
