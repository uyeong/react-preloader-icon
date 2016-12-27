const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: './src/index.js',
        vendor: [
            'object-assign',
            'react',
            'react-dom',
            'stepperjs'
        ],
    },
    output: {
        path: path.resolve(__filename, '../dist'),
        filename: 'browser.js',
        library: 'PreloaderIcon',
        libraryTarget: 'umd'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Demo - React Preloader Icon',
            template: 'html/index.html',
            inject: 'head'
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'browser.vendor.js'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${process.env.NODE_ENV}"`
            }
        })
    ],
    module: {
        loaders: [{
            test: /.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react'],
                plugins: [
                    'transform-class-properties',
                    'transform-decorators-legacy'
                ],
                cacheDirectory: true
            }
        }, {
            test: require.resolve("react"), loader: "expose?React"
        }, {
            test: require.resolve("react-dom"), loader: "expose?ReactDOM"
        }]
    },
    devServer: {
        port: 8080,
        colors: true,
        historyApiFallback: {
            index: 'build/index.html'
        }
    }
};
