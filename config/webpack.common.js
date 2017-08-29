// Pull in NPM packages
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/app.ts',
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.sass'],
  },
  module: {
    rules: [
      // javascript & typescript
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },

      // pug & html
      {
        test: /\.pug$/,
        use: 'pug-loader',
      },

      // images
      {
        test: /\.png$/,
        use: 'file-loader',
      },
      {
        test: /\.jpg$/,
        use: 'file-loader',
      },
      {
        test: /\.jpeg$/,
        use: 'file-loader',
      },

      // fonts
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'App Page',
      hash: true,
      excludeChunks: ['contact'],
      template: './src/app.pug',
    }),
    new webpack.NamedModulesPlugin(),
  ],
};

console.log(`---------------------------------------
BOOTING UP WEBPACK...`);
