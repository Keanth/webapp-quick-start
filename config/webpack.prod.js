const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(commonConfig, {
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
      filename: 'app.css',
      allChunks: true,
    }),
  ],
});

console.log(`---------------------------------------
BUILDING FOR PRODUCTION...
---------------------------------------`);
