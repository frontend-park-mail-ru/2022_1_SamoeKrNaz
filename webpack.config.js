const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HandlebarsPlugin = require('handlebars-webpack-plugin');

module.exports = {
	entry: './src/js/index.js',
	module: {
		rules: [
			{
				test: /\.(s*)css$/,
				include: path.resolve(__dirname, 'src/css'),
				use: ['style-loader', {
					loader: 'css-loader',
					options: {importLoaders: 1},
				}, 'sass-loader']},
			{
				test: /\.(js)$/,
				exclude: path.resolve(__dirname, 'node_modules/'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				}},
		],
	},
	output: {
		path: path.resolve(__dirname, 'src'),
		filename: '../index_bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/template.html',
			inject: false,
		}),
	],
	mode: 'production',
};
