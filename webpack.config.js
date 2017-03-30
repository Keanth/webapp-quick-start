const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const path = require( 'path' );

module.exports = {
	entry: {
		app: './src/app.js',
		contact: './src/other.js'
	},
	output: {
		path: path.join( __dirname, 'dist' ),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{ 
				test: /\.scss$/, use: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: ['css-loader', 'sass-loader'],
					publicPath: '/dist'
				}) 
			},
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: 'babel-loader' 
			},
			{
				test: /\.pug/,
				loaders: ['raw-loader', 'pug-html-loader']
			}
		]
	},
	devServer: {
		contentBase: path.join( __dirname, 'dist' ),
		compress: true,
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
			template: './src/index.pug'
		}),
		new HtmlWebpackPlugin({
			title: 'Other Page',
			hash: true,
			chunks: [ 'Other' ],
			filename: 'Other.html',
			template: './src/Other.ejs'
		}),
		new ExtractTextPlugin({
			filename: 'app.css',
			disable: false,
			allChunks: true
		})
	]
}