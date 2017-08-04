const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const path = require( 'path' );
const webpack = require ( 'webpack' );

var isProd = process.env.NODE_ENV === 'production'; // boolean
const cssDev = [ 'style-loader', 'css-loader', 'sass-loader' ];
const cssProd = ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader'],
					publicPath: '/dist'
				});
var cssConfig = isProd ? cssProd : cssDev; 

module.exports = {
	entry: {
		app: './src/app.js',
		// contact: './src/other.js'
	},
	output: {
		path: path.join( __dirname, 'dist' ),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{ 
				test: /\.sass$/, 
				use: cssConfig
			},
			// { 
			// 	test: /\.scss$/, 
			// 	use: ['style-loader', 'css-loader', 'sass-loader']
			// },
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: 'babel-loader' 
			},
			{
				test: /\.pug$/,
				loaders: 'pug-loader'
			},
			{
				test: /\.png$/,
				use: 'file-loader'
			}
		]
	},
	devServer: {
		contentBase: path.join( __dirname, 'dist' ),
		compress: true,
		hot: true,
		// IT'S OVER 9000
		port: 9001,
		stats: 'errors-only'
	},
	plugins: [ 
		new HtmlWebpackPlugin({
			title: 'App Page',
			// minify: {
			// 	collapseWhitespace: true
			// },
			hash: true,
			excludeChunks: [ 'contact' ],
			template: './src/app.pug'
		}),
		// new HtmlWebpackPlugin({
		// 	title: 'Other Page',
		// 	hash: true,
		// 	chunks: [ 'Other' ],
		// 	filename: 'Other.html',
		// 	template: './src/Other.ejs'
		// }),
		new ExtractTextPlugin({
			filename: 'app.css',
			disable: !isProd,
			allChunks: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]
}
