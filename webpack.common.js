const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        browser: './src/browser.js'
    },
    output: {
        path: path.resolve(__filename, '../dist'),
        filename: '[name].js',
        library: 'PreloaderIcon',
        libraryTarget: 'umd'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Demo - React Preloader Icon',
            template: 'html/index.html',
            inject: 'head'
        })
    ],
    externals: {
        react: 'React',
        'prop-types': 'PropTypes'
    },
    module: {
        rules: [{
            test: /(\.js)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: ['env', 'react'],
                plugins: ['transform-class-properties'],
                comments: false,
                cacheDirectory: true
            }
        }]
    }
};
