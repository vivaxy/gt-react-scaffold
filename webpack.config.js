/**
 * @since 2016-05-29 10:50
 * @author vivaxy
 */

'use strict';

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

const DEVELOPMENT_IP = '0.0.0.0';
const DEVELOPMENT_PORT = 8080;
const SOURCE_PATH = 'source';
const RELEASE_PATH = 'release';
const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
const NODE_MODULES = 'node_modules';
const MOCK_SERVER_BASE = 'mock-server';
const ENTRIES_FOLDER = 'entries';
const HTML_FOLDER = 'html';
const COMMON_CHUNK_NAME = 'common';

const BANNER = '@2016 vivaxy';

const NODE_ENV = process.env.NODE_ENV || PRODUCTION;

const jsLoader = {
    test: /\.js$/,
    include: [
        path.resolve(__dirname, SOURCE_PATH),
    ],
    loaders: [
        'babel',
    ],
};

const cssLoader = {
    test: /\.css$/,
    include: [
        path.resolve(__dirname, SOURCE_PATH),
    ],
    loaders: [
        'style',
        'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!',
    ],
};

const cssModuleLoader = {
    test: /\.css$/,
    include: [
        path.resolve(__dirname, NODE_MODULES),
    ],
    loaders: [
        'style',
        'css',
    ],
};

const lessLoader = {
    test: /\.less$/,
    include: [
        path.resolve(__dirname, SOURCE_PATH),
    ],
    loaders: [
        'style',
        'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!',
        'less',
    ],
};

const lessModuleLoader = {
    test: /\.less$/,
    include: [
        path.resolve(__dirname, NODE_MODULES),
    ],
    loaders: [
        'style',
        'css',
        'less',
    ],
};

const jsonLoader = {
    test: /\.json$/,
    loaders: [
        'json',
    ],
};

const fileLoader = {
    test: /\.(png|jpg|gif)$/,
    loaders: [
        'url?limit=8192&name=images/[name]-[hash].[ext]',
    ],
};

// default webpack config
let webpackConfig = {
    entry: {
        [COMMON_CHUNK_NAME]: [
            // remove babel-polyfill according to https://github.com/pigcan/blog/issues/1
            'isomorphic-fetch',
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'material-ui',
            'react-tap-event-plugin',
            'tiny-cookie',
            'react-tap-event-plugin',
            'react-pianist',
        ],
    },
    output: {
        path: path.resolve(__dirname, RELEASE_PATH),
        filename: 'js/[name].js',
        // pages rests in different folder levels
        hotUpdateMainFilename: '[hash].hot-update.json',
        hotUpdateChunkFilename: '[id].[hash].hot-update.js',
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
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV),
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: COMMON_CHUNK_NAME,
            // pages rests in different folder levels
            filename: 'js/[name].js',
        }),
        new Visualizer(),
    ]
};

// get entry
const entryFileNameList = glob.sync(path.join(SOURCE_PATH, ENTRIES_FOLDER) + '/*.js');
const entryNameList = entryFileNameList.map((entryFileName) => {
    return path.basename(entryFileName, '.js');
});

// get corresponding html template
const htmlFileNameList = glob.sync(path.join(SOURCE_PATH, HTML_FOLDER) + '/*.html');
const htmlNameList = htmlFileNameList.map((htmlFileName) => {
    return path.basename(htmlFileName, '.html');
});

// set entry
entryNameList.forEach((entryName) => {
    webpackConfig.entry[entryName] = [
        path.join(__dirname, `./${SOURCE_PATH}/${ENTRIES_FOLDER}/${entryName}.js`),
    ];

    let htmlTemplateName = `index`;
    if (htmlNameList.indexOf(entryName) !== -1) {
        htmlTemplateName = entryName;
    }

    webpackConfig.plugins.push(new HtmlWebpackPlugin({
        template: `${SOURCE_PATH}/${HTML_FOLDER}/${htmlTemplateName}.html`,
        filename: `${HTML_FOLDER}/${entryName}.html`,
        hash: true,
        inject: 'body',
        chunks: [
            COMMON_CHUNK_NAME,
            entryName,
        ],
    }));

});

// set config according to environment
switch (NODE_ENV) {
    case DEVELOPMENT:

        // support react-hot-loader@3, @see https://github.com/gaearon/react-hot-loader/tree/next-docs
        jsLoader.loaders.push('react-hot-loader/webpack');

        entryNameList.forEach((entryName) => {

            webpackConfig.entry[entryName].unshift(`webpack-dev-server/client?http://${DEVELOPMENT_IP}:${DEVELOPMENT_PORT}`);
            webpackConfig.entry[entryName].unshift('webpack/hot/log-apply-result');

            // hot reload
            // webpackConfig.entry[entryName].unshift('webpack/hot/dev-server');
            webpackConfig.entry[entryName].unshift('webpack/hot/only-dev-server');

            // support react-hot-loader@3, @see https://github.com/gaearon/react-hot-loader/tree/next-docs
            webpackConfig.entry[entryName].unshift('react-hot-loader/patch');
        });

        webpackConfig.devtool = 'eval';
        webpackConfig.output.publicPath = '/';

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
                colors: true,
            },
        };

        webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
        break;
    default:
        webpackConfig.devtool = 'source-map';
        webpackConfig.output.publicPath = '../';
        webpackConfig.plugins.push(new webpack.BannerPlugin(BANNER));
        webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
        webpackConfig.plugins.push(new webpack.optimize.DedupePlugin());
        break;
}

module.exports = webpackConfig;
