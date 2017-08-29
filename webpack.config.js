const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production'; // boolean
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: '/dist',
});
const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: {
    app: './src/app.ts',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  // Turn on sourcemaps
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.sass'],
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: cssConfig,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.pug$/,
        loaders: 'pug-loader',
      },
      {
        test: /\.png$/,
        use: 'file-loader',
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 9001,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'App Page',
      hash: true,
      excludeChunks: ['contact'],
      template: './src/app.pug',
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      disable: !isProd,
      allChunks: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};
