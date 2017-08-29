const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(commonConfig, {
  output: {
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      // css & preprocessors
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 9001,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});

console.log(`---------------------------------------
> RUNNING DEVELOPMENT SERVER...
---------------------------------------`);
