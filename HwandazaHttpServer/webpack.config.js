var webpack = require('webpack');
var path = require('path');

module.exports = {
    mode:'development',
    devtool: 'eval-sore-map',
    entry: path.resolve(__dirname, 'Web/react/src/main.js'),
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'Web/js'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'Web/react'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['react'],
                    },
                },
                    exclude: /(node_modules|bower_components)/,
            },
        ],
    },
};