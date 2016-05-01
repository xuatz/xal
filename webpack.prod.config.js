var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devTool: 'source-map',
	entry: [
		'./index.js'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.html', // Load a custom template 
			inject: 'body' // Inject all scripts into the body 
		}),
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.NoErrorsPlugin()

	],
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
			include: __dirname,
			exclude: /node_modules/
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	devServer: {
		contentBase: './dist',
		hot: true
	},
};