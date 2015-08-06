// Based on the configuration included with
// https://github.com/roman01la/react-native-babel
// by Roman Liutikov

var webpack = require('webpack');
var path = require('path');
var AnyBarWebpackPlugin = require('anybar-webpack');

module.exports = {
  watch: true,
  entry: path.join(__dirname, '/src/main.es6'),
  module: {
    loaders: [
      {
        test: /\.(js|jsx|es6)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?optional=runtime']
      },
      {
        test: /\.js$/,
        include: /node_modules\/react-native-video/,
        loaders: ['babel-loader?optional=es7.objectRestSpread']
      },
      {
        test: /\.js$/,
        include: /node_modules\/react-native-localization/,
        loaders: ['babel-loader?optional=runtime']
      }
    ]
  },
  output: {
    path: path.join(__dirname, '/'),
    filename: 'index.ios.js',
    libraryTarget: 'commonjs'
  },
  externals: [require('./ignored-modules')],
  resolve: { extensions: ['', '.js', '.jsx', '.es6'] },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new AnyBarWebpackPlugin()
  ],
};
