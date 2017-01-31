/**
 * @since 2017-01-12 17:35
 * @author vivaxy
 */

const open = require('open');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('../webpack.config');
const config = require('./config');

const compiler = webpack(webpackConfig);

let opened = false;

const devServerOptions = {
    proxy: {},
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true,
    },
};

const setProxy = () => {
    const proxyMap = {
        '/html': `/${config.RELEASE_PATH}/html`,
        '/js': `/${config.RELEASE_PATH}/js`,
        '/images': `/${config.RELEASE_PATH}/images`,
    };
    Object.keys(proxyMap).forEach((pKey) => {
        devServerOptions.proxy[pKey] = {
            pathRewrite: proxyMap[pKey],
        };
    });
};

const openBrowser = () => {
    const address = server.listeningApp.address();
    const url = `http://${address.address}:${address.port}`;
    console.log(`   server started: ${url}`);
    open(`${url}/html/index.html`);
};

setProxy();

const server = new WebpackDevServer(compiler, devServerOptions);

compiler.plugin('done', function() {
    if (!opened) {
        opened = true;
        openBrowser();
    }
});

server.listen(config.DEVELOPMENT_PORT, config.DEVELOPMENT_IP, function(err) {
    if (err) {
        console.log(err);
    }
});

const stdIn = process.stdin;
stdIn.setEncoding('utf8');
stdIn.on('data', openBrowser);
