const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/client/index.tsx",
	mode: (process.env.NODE_ENV === "production") ? "production" : "development",
	module: {
		rules: [
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				exclude: /(node_modules|bower_components)/,
				loader: "babel-loader",
				options: { presets: ["@babel/env"] },
			},
			{
				test: /\.css|less$/,
				exclude: /node_modules/,
				use: ["style-loader", "css-loader", "less-loader"],
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "style-loader", // inject CSS to page
					},
					{
						loader: "css-loader", // translates CSS into CommonJS modules
					},
					{
						loader: "postcss-loader", // Run post css actions
						options: {
							plugins: function () {
								// post css plugins, can be exported to postcss.config.js
								return [
									require("precss"),
									require("autoprefixer"),
								];
							},
						},
					},
					{
						loader: "sass-loader", // compiles Sass to CSS
					},
				],
			},
		],
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"],
		alias: {
			Enums$: path.resolve(__dirname, "../shared/enums/index.ts"),
			Models$: path.resolve(__dirname, "../shared/models/index.ts"),
		},
	},
	output: {
		path: path.resolve(__dirname, "dist/"),
		publicPath: "/",
		filename: "bundle.js",
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/client/public/index.html",
			filename: "./index.html",
		}),
	],
};
