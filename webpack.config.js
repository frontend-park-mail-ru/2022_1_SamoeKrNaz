const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.ts',
	resolve: {
		extensions: ['.js', '.ts', '.hbs', '.templ.js'],
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
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: path.resolve(__dirname, 'node_modules/'),
			},
			{
				test: /\.hbs$/,
				loader: 'handlebars-loader',
				options: {
					partialDirs: path.resolve(__dirname, 'src/components'),
				},
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
		filename: 'index_bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/template.html',
			inject: false,
		}),
	],
	mode: 'production',
};
