const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: (process.env.NODE_ENV === 'production') ? 'production' : 'development',
    target: 'node',
    entry: path.resolve(__dirname, './server.js'),
    devtool: 'inline-source-map',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../../'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    }
}
