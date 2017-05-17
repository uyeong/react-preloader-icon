const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: './src/index.js',
        vendor: [
            'bezier-easing',
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
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'browser.vendor.js'}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${process.env.NODE_ENV}"`
            }
        })
    ],
    module: {
        rules: [{
            test: /(\.js)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: ['es2015', 'react'],
                plugins: ['transform-class-properties'],
                comments: false,
                cacheDirectory: true
            }
        }, {
            test: require.resolve('react'),
            use: {
                loader: 'expose-loader',
                query: 'React'
            }
        }, {
            test: require.resolve('react-dom'),
            use: {
                loader: 'expose-loader',
                query: 'ReactDOM'
            }
        }]
    },
    devServer: {
        port: 8080,
        contentBase: path.resolve(__filename, '../dist'),
        historyApiFallback: {
            index: 'build/index.html'
        }
    }
};
