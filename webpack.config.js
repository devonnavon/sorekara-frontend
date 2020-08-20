//webpack.config.js
// const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const jQueryPath = 'jquery/dist/jquery.js';

module.exports = {
	entry: ['./src/index.js'],
	resolve: {
		alias: {
			jquery$: jQueryPath,
		},
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: './frontend/src/assets/',
					},
				},
			},
			{
				test: /\.svg$/,
				use: 'file-loader',
			},
		],
	},
	plugins: [
		new Dotenv({ silent: false }),
		new webpack.EnvironmentPlugin({ API_URL: '' }),
		new webpack.HotModuleReplacementPlugin(),
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: 'style.css',
			chunkFilename: 'style.css',
		}),
		new HtmlWebPackPlugin({
			template: './src/index.html',
			inject: true,
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: './img', to: './img' },
				// {
				// 	from: './node_modules/trumbowyg/dist/ui/*.svg',
				// },
			],
		}),
		new webpack.ProvidePlugin({
			Vue: ['vue/dist/vue.esm.js', 'default'],
			jQuery: jQueryPath,
			$: jQueryPath,
			'window.jQuery': jQueryPath,
		}),
	],
};
