const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
	entry: './src/index.ts',
	resolve: {
		extensions: ['.js', '.ts', '.hbs', '.templ.js', '.scss', '.css'],
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(s*)css$/,
				include: path.resolve(__dirname, 'src/css'),
				use: ['style-loader', {
					loader: 'css-loader',
					options: {importLoaders: 1},
				}, 'sass-loader'],
			},
			{
				test: /\.(js)$/,
				exclude: path.resolve(__dirname, 'node_modules/'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.hbs$/,
				loader: 'handlebars-loader',
				options: {
					partialDirs: path.resolve(__dirname, 'src/components'),
				},
			},
			{
				include: [
					path.resolve(__dirname, 'src/'),
				],
				test: /\.(s*)css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: path.resolve(__dirname, 'node_modules/'),
			},
			{
				test: /\.js$/,
				loader: 'source-map-loader',
			},
		],
	},
	output: {
		publicPath: '../',
		path: path.resolve(__dirname, 'src'),
		filename: '[name].[contenthash].js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/template.html',
			inject: false,
			title: 'Caching',
		}),
		new MiniCssExtractPlugin({filename: `style.css`}),
	],
	mode: 'production',
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin(),
			new CssMinimizerPlugin(),
		],
	},
};
