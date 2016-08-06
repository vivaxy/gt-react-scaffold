/**
 * @since 2016-05-29 10:50
 * @author vivaxy
 */

var glob = require('glob');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var devPort = 8080;
var SOURCE_PATH = 'source';
var RELEASE_PATH = 'release';

var NODE_ENV = process.env.NODE_ENV || 'production'; // eslint-disable-line no-var, no-process-env

var webpackConfig = { // eslint-disable-line no-var
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
    ]
};

var entryFileNameList = glob.sync(path.join(SOURCE_PATH, 'html') + '/*.html');
var entryNameList = entryFileNameList.map(function(entryFileName) {
    return path.basename(entryFileName, '.html');
});

entryNameList.forEach(function(entryName) {
    var entry = webpackConfig.entry;
    entry[entryName] = [
        path.join(__dirname, `./${SOURCE_PATH}/entry/${entryName}.js`)
    ];

    var plugins = webpackConfig.plugins;
    plugins.push(new HtmlWebpackPlugin({
        template: `${SOURCE_PATH}/html/${entryName}.html`,
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
        break;
    case 'production':
        webpackConfig.devtool = 'source-map';
        webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
        webpackConfig.plugins.push(new webpack.DefinePlugin({
            'process.env': { // eslint-disable-line quote-props
                'NODE_ENV': JSON.stringify('production')
            }
        }));
        break;
    default:
        throw new Error('NODE_ENV not found, NODE_ENV=' + NODE_ENV); // eslint-disable-line prefer-template
}

module.exports = webpackConfig;
