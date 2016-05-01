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
		publicPath: '/dist'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html', // Load a custom template 
			inject: 'body' // Inject all scripts into the body 
		}),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};