var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

module.exports = {
	entry: [
		'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
		'./index.js'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel'
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	devServer: {
		hot: true,
		contentBase: './dist'
	}
};