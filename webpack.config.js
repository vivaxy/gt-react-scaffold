/**
 * @since 2016-05-29 10:50
 * @author vivaxy
 */

'use strict';

const glob = require('glob');
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
const COMMON_CHUNK_NAME = 'common';

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
};

const lessLoader = {
    test: /\.less$/,
    loaders: [
        'style',
        'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!',
        'less',
    ],
};

const jsonLoader = {
    test: /\.json$/,
    loader: 'json',
};

const fileLoader = {
    test: /\.(png|jpg|gif)$/,
    loader: 'url?limit=8192&name=image/[name]-[hash].[ext]',
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
        ]
    },
    output: {
        path: path.resolve(__dirname, `${RELEASE_PATH}`),
        filename: 'js/[name].js'
    },
    module: {
        loaders: [
            jsLoader,
            cssLoader,
            lessLoader,
            jsonLoader,
            fileLoader,
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: COMMON_CHUNK_NAME,
            filename: 'js/[name].js'
        }),
        new Visualizer(),
    ]
};

// get entry
const entryFileNameList = glob.sync(path.join(SOURCE_PATH, 'entry') + '/*.js');
const entryNameList = entryFileNameList.map((entryFileName) => {
    return path.basename(entryFileName, '.js');
});

// get corresponding html template
const htmlFileNameList = glob.sync(path.join(SOURCE_PATH, 'html') + '/*.html');
const htmlNameList = htmlFileNameList.map((htmlFileName) => {
    return path.basename(htmlFileName, '.html');
});

// set entry
entryNameList.forEach((entryName) => {
    webpackConfig.entry[entryName] = [
        path.join(__dirname, `./${SOURCE_PATH}/entry/${entryName}.js`)
    ];

    let htmlTemplateName = `template`;
    if (htmlNameList.indexOf(entryName) !== -1) {
        htmlTemplateName = entryName;
    }

    webpackConfig.plugins.push(new HtmlWebpackPlugin({
        template: `${SOURCE_PATH}/html/${htmlTemplateName}.html`,
        filename: `html/${entryName}.html`,
        hash: true,
        inject: 'body',
        chunks: [
            COMMON_CHUNK_NAME,
            entryName
        ]
    }));
});

// set config according to environment
switch (NODE_ENV) {
    case DEVELOPMENT:

        // support react-hot-loader@3, @see https://github.com/gaearon/react-hot-loader/tree/next-docs
        jsLoader.loaders.push('react-hot-loader/webpack');

        webpackConfig.output.publicPath = `/${RELEASE_PATH}/`;

        entryNameList.forEach((entryName) => {
            webpackConfig.entry[entryName].unshift('webpack-dev-server/client?http://' + DEVELOPMENT_IP + ':' + DEVELOPMENT_PORT);
            webpackConfig.entry[entryName].unshift('webpack/hot/log-apply-result');

            // hot reload
            // webpackConfig.entry[entryName].unshift('webpack/hot/dev-server');
            webpackConfig.entry[entryName].unshift('webpack/hot/only-dev-server');

            // support react-hot-loader@3, @see https://github.com/gaearon/react-hot-loader/tree/next-docs
            webpackConfig.entry[entryName].unshift('react-hot-loader/patch');
        });

        webpackConfig.devtool = 'eval';

        webpackConfig.devServer = {
            hot: true,
            historyApiFallback: true,
            host: DEVELOPMENT_IP,
            port: DEVELOPMENT_PORT,
            stats: {
                colors: true
            }
        };

        webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

        break;
    case PRODUCTION:
        webpackConfig.output.publicPath = '../';
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
