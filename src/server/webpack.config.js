const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: (process.env.NODE_ENV === 'production') ? 'production' : 'development',
    target: 'node',
    entry: path.resolve(__dirname, './index.ts'),
    devtool: 'inline-source-map',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../../'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test:/\.(ts|js)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
		extensions: ['.ts', '.js'],
		alias: {
			Enums$: path.resolve(__dirname, '../shared/enums/index.ts'),
			Interfaces$: path.resolve(__dirname, '../shared/interfaces/index.ts'),
			Models$: path.resolve(__dirname, '../shared/models/index.ts')
		}
    }
}
