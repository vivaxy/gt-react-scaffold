/**
 * @since 2016-05-29 10:50
 * @author vivaxy
 */

var glob = require('glob');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var DEVELOPMENT_PORT = 8080;
var SOURCE_PATH = 'source';
var RELEASE_PATH = 'release';
var DEVELOPMENT = 'development';
var PRODUCTION = 'production';

var BANNER = '@2016 vivaxy';

var NODE_ENV = process.env.NODE_ENV || PRODUCTION;

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
                    'babel'
                ]
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file?name=image/[name]-[hash].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common', 'js/common.js')
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
    case DEVELOPMENT:

        webpackConfig.module.loaders[0].loaders.unshift('react-hot');

        webpackConfig.output.publicPath = `/${RELEASE_PATH}/`;

        var entry = webpackConfig.entry;
        entryNameList.forEach(function(entryName) {
            entry[entryName].unshift('webpack-dev-server/client?http://127.0.0.1:' + DEVELOPMENT_PORT);
            entry[entryName].unshift('webpack/hot/log-apply-result');
            entry[entryName].unshift('webpack/hot/only-dev-server');
        });

        webpackConfig.devtool = 'eval';

        webpackConfig.devServer = {
            hot: true,
            historyApiFallback: true,
            port: DEVELOPMENT_PORT,
            stats: {
                colors: true
            }
        };

        var plugins = webpackConfig.plugins;
        plugins.push(new webpack.HotModuleReplacementPlugin());
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
