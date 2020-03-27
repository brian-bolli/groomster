const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  module: {
    rules: [
      {
		test: /\.(ts|tsx|js|jsx)$/,
		exclude: /node_modules/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
		test: /\.css|less$/,
		exclude: /node_modules/,
        use: ["style-loader", "css-loader", "less-loader"]
	  },
	  {
		test: /\.scss$/,
		exclude: /node_modules/,
        use: [{
			loader: 'style-loader', // inject CSS to page
		  }, {
			loader: 'css-loader', // translates CSS into CommonJS modules
		  }, {
			loader: 'postcss-loader', // Run post css actions
			options: {
			  plugins: function () { // post css plugins, can be exported to postcss.config.js
				return [
				  require('precss'),
				  require('autoprefixer')
				];
			  }
			}
		  }, {
			loader: 'sass-loader' // compiles Sass to CSS
		  }]
	  }
    ]
  },
  resolve: { extensions: [".ts", ".tsx", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [
	  new webpack.HotModuleReplacementPlugin(),
	  new HtmlWebpackPlugin({
		  template: './public/index.html',
		  filename: './index.html'
	  })
	]
};
