/**
 * @since 2016-05-29 10:50
 * @author vivaxy
 */

var glob = require('glob');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var WebpackBrowserPlugin = require('webpack-browser-plugin');
// var FaviconsWebpackPlugin = require('favicons-webpack-plugin');

var devPort = 8080;
var SOURCE_PATH = 'source';
var RELEASE_PATH = 'release';
var BANNER = 'vivaxy@2016';

var NODE_ENV = process.env.NODE_ENV || 'production';

var webpackConfig = {
    entry: {
        'common': [
            'babel-polyfill',
            'whatwg-fetch',
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'material-ui',
            'react-tap-event-plugin'
        ]
    },
    output: {
        path: path.resolve(__dirname, `${RELEASE_PATH}`),
        filename: 'js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    'babel-loader'
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader?name=image/[name]-[hash].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common', 'js/common.js')
        // new FaviconsWebpackPlugin(`./${SOURCE_PATH}/image/vivaxy.20150726.jpg`)
    ]
};

var entryFileNameList = glob.sync(path.join(SOURCE_PATH, 'entry') + '/*.js');
var entryNameList = entryFileNameList.map(function(entryFileName) {
    return path.basename(entryFileName, '.js');
});

entryNameList.forEach(function(entryName) {
    var entry = webpackConfig.entry;
    entry[entryName] = [
        path.join(__dirname, `./${SOURCE_PATH}/entry/${entryName}.js`)
    ];

    var plugins = webpackConfig.plugins;
    plugins.push(new HtmlWebpackPlugin({
        template: `${SOURCE_PATH}/html/index.html`,
        filename: `html/${entryName}.html`,
        hash: true,
        inject: 'body',
        chunks: [
            'common',
            entryName
        ]
    }));
});

switch (NODE_ENV) {
    case 'dev':

        webpackConfig.module.loaders[0].loaders.unshift('react-hot');

        webpackConfig.output.publicPath = `/${RELEASE_PATH}/`;

        var entry = webpackConfig.entry;
        entryNameList.forEach(function(entryName) {
            entry[entryName].unshift('webpack-dev-server/client?http://127.0.0.1:' + devPort);
            entry[entryName].unshift('webpack/hot/log-apply-result');
            entry[entryName].unshift('webpack/hot/only-dev-server');
        });

        webpackConfig.devtool = 'eval';

        webpackConfig.devServer = {
            hot: true,
            historyApiFallback: true,
            port: devPort,
            stats: {
                colors: true
            }
        };

        var plugins = webpackConfig.plugins;
        plugins.push(new webpack.HotModuleReplacementPlugin());
        // plugins.push(new WebpackBrowserPlugin({
        //     port: devPort,
        //     browser: 'chrome',
        //     url: `http://127.0.0.1:${devPort}/release/html/demo.html`
        // }));
        break;
    case 'production':
        webpackConfig.devtool = 'source-map';
        webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
        webpackConfig.plugins.push(new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }));
        webpackConfig.plugins.push(new webpack.BannerPlugin(BANNER));
        webpackConfig.plugins.push(new webpack.optimize.DedupePlugin());
        break;
    default:
        throw new Error('NODE_ENV not found, NODE_ENV=' + NODE_ENV);
}

module.exports = webpackConfig;
