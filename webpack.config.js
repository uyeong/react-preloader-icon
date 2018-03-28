const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        browser: './src/index.js',
        ['browser.vendor']: [
            'bezier-easing',
            'object-assign',
            'react',
            'stepperjs'
        ],
    },
    output: {
        path: path.resolve(__filename, '../dist'),
        filename: '[name].js',
        library: 'PreloaderIcon',
        libraryTarget: 'umd'
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "browser.vendor",
            chunks: "all"
          }
        }
      },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Demo - React Preloader Icon',
            template: 'html/index.html',
            inject: 'head'
        }),
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
                presets: ['env', 'react'],
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
