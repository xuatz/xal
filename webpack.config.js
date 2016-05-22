var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	debug: true,
	devtool: 'cheap-module-eval-source-map',
	noInfo: false,
	entry: [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'./src/index.js'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	devServer: {
		hot: true,
		contentBase: './dist',
		stats: 'error-only'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html', // Load a custom template 
			inject: 'body' // Inject all scripts into the body 
		}),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'},
			{test: /(\.css)$/, loaders: ['style', 'css']}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};