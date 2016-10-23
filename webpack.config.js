/**
 * @since 2016-05-29 10:50
 * @author vivaxy
 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

const DEVELOPMENT_IP = '0.0.0.0';
const DEVELOPMENT_PORT = 8080;
const SOURCE_PATH = 'source';
const RELEASE_PATH = 'release';
const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
const MAIN_ENTRY_NAME = 'index';
const NODE_MODULES = 'node_modules';
const MOCK_SERVER_BASE = 'mock-server';

const BANNER = '@2016 vivaxy';

const NODE_ENV = process.env.NODE_ENV || PRODUCTION;

const jsLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loaders: [
        'babel',
    ],
};

const cssLoader = {
    test: /\.css$/,
    loaders: [
        'style',
        'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!',
    ],
    include: [
        path.resolve(__dirname, SOURCE_PATH),
    ],
};

const cssModuleLoader = {
    test: /\.css$/,
    loaders: [
        'style',
        'css',
    ],
    include: [
        path.resolve(__dirname, NODE_MODULES),
    ],
};

const lessLoader = {
    test: /\.less$/,
    loaders: [
        'style',
        'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!',
        'less',
    ], include: [
        path.resolve(__dirname, SOURCE_PATH),
    ],
};

const lessModuleLoader = {
    test: /\.less$/,
    loaders: [
        'style',
        'css',
        'less',
    ], include: [
        path.resolve(__dirname, NODE_MODULES),
    ],
};

const jsonLoader = {
    test: /\.json$/,
    loader: 'json',
};

const fileLoader = {
    test: /\.(png|jpg|gif)$/,
    loader: 'url?limit=8192&name=images/[name]-[hash].[ext]',
};

// default webpack config
let webpackConfig = {
    entry: {
        [MAIN_ENTRY_NAME]: [
            `./${SOURCE_PATH}/entries/index.js`,
        ],
    },
    output: {
        path: path.resolve(__dirname, RELEASE_PATH),
        filename: 'js/[name].js',
        // pages rests in different folder levels
        hotUpdateMainFilename: '/[hash].hot-update.json',
        hotUpdateChunkFilename: '/[id].[hash].hot-update.js',
    },
    module: {
        loaders: [
            jsLoader,
            cssLoader,
            lessLoader,
            jsonLoader,
            fileLoader,
            cssModuleLoader,
            lessModuleLoader,
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${SOURCE_PATH}/html/index.html`,
            filename: `index.html`,
            hash: true,
            inject: 'body',
            chunks: [
                MAIN_ENTRY_NAME,
            ]
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: MAIN_ENTRY_NAME,
            // pages rests in different folder levels
            filename: '/js/[name].js'
        }),
        new Visualizer(),
    ]
};

// set config according to environment
switch (NODE_ENV) {
    case DEVELOPMENT:

        // support react-hot-loader@3, @see https://github.com/gaearon/react-hot-loader/tree/next-docs
        jsLoader.loaders.push('react-hot-loader/webpack');

        webpackConfig.entry[MAIN_ENTRY_NAME].unshift('webpack-dev-server/client?http://' + DEVELOPMENT_IP + ':' + DEVELOPMENT_PORT);
        webpackConfig.entry[MAIN_ENTRY_NAME].unshift('webpack/hot/log-apply-result');

        // hot reload
        // webpackConfig.entry[MAIN_ENTRY_NAME].unshift('webpack/hot/dev-server');
        webpackConfig.entry[MAIN_ENTRY_NAME].unshift('webpack/hot/only-dev-server');

        // support react-hot-loader@3, @see https://github.com/gaearon/react-hot-loader/tree/next-docs
        webpackConfig.entry[MAIN_ENTRY_NAME].unshift('react-hot-loader/patch');

        webpackConfig.devtool = 'eval';

        webpackConfig.devServer = {
            contentBase: [
                RELEASE_PATH,
                MOCK_SERVER_BASE,
            ],
            hot: true,
            historyApiFallback: true,
            host: DEVELOPMENT_IP,
            port: DEVELOPMENT_PORT,
            stats: {
                colors: true
            },
        };

        webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

        break;
    case PRODUCTION:
        webpackConfig.devtool = 'source-map';
        webpackConfig.plugins.push(new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(PRODUCTION)
            }
        }));
        webpackConfig.plugins.push(new webpack.BannerPlugin(BANNER));
        webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
        webpackConfig.plugins.push(new webpack.optimize.DedupePlugin());
        break;
    default:
        throw new Error('NODE_ENV not found, NODE_ENV=' + NODE_ENV);
}

module.exports = webpackConfig;
