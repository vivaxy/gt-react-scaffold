/**
 * @since 2016-05-29 10:50
 * @author vivaxy
 */

var glob = require('glob');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var SOURCE_PATH = 'source';
var RELEASE_PATH = 'release';

var NODE_ENV = process.env.NODE_ENV || 'production'; // eslint-disable-line no-var, no-process-env

var webpackConfig = { // eslint-disable-line no-var
    entry: {
        'vendors': ['whatwg-fetch']
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
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader?name=[name]-[hash].[ext]'
            }
        ]
    },
    plugins: []
};

switch (NODE_ENV) {
    case 'dev':
        webpackConfig.devtool = 'eval';
        webpackConfig.devServer = {
            inline: true,
            open: true // for webpack-dev-server version > 2
        };
        break;
    case 'production':
        webpackConfig.devtool = 'source-map';
        webpackConfig.plugins.push(new webpack.DefinePlugin({
            'process.env': { // eslint-disable-line quote-props
                'NODE_ENV': JSON.stringify('production')
            }
        }));
        break;
    default:
        throw new Error('NODE_ENV not found, NODE_ENV=' + NODE_ENV); // eslint-disable-line prefer-template
}

var entryList = glob.sync(path.join(SOURCE_PATH, 'entry') + '/*.js');

entryList.forEach(function (entryFileName) {
    var entryName = path.basename(entryFileName, '.js');
    var entry = webpackConfig.entry;
    entry[entryName] = path.join(__dirname, `./${SOURCE_PATH}/entry/${entryName}.js`);

    var plugins = webpackConfig.plugins;
    plugins.push(new HtmlWebpackPlugin({
        template: `${SOURCE_PATH}/html/${entryName}.html`,
        filename: `html/${entryName}.html`,
        hash: true,
        inject: 'body',
        chunks: [
            'vendors',
            entryName
        ]
    }));
});

module.exports = webpackConfig;
