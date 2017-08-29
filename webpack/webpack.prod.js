const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(commonConfig, {
  output: {
    filename: '[name].bundle.[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: '/dist',
        }),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: '/dist',
        }),
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].style.[hash].css',
      allChunks: true,
    }),
    // uglify JS (obscure & minimize)
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),

    // minimize other files (css, ...), here for webpack 1.x plugins
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
});

console.log(`---------------------------------------
> BUILDING FOR PRODUCTION...
---------------------------------------`);
