// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
const path = require('path');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const HtmlWebpackPlugin = require('html-webpack-plugin');

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
	entry: './src/js/index.js',
	module: {
		rules: [
			{
				test: /\.(s*)css$/,
				// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
				include: path.resolve(__dirname, 'src/css'),
				use: ['style-loader', {
					loader: 'css-loader',
					options: {importLoaders: 1},
				}, 'sass-loader']},
			{
				test: /\.(js)$/,
				// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
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
		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
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
