var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'client');

var config = {
  entry: path.join(APP_DIR + '/index.jsx'),
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  contentBase: 'build/',
  publicPath: "/",
  plugins: [

  ],
  target: "web",
  module: {
      loaders: [
          {
              test: /\jsx?/,
              include: APP_DIR,
              loader: 'babel',
              query: {
                  presets: ['react', 'es2015']
              }
          },
          {
              test: /\less$/,
              loader: "style!css!less"
          }
      ]
  },
  devtool: "source-map",
  devServer: {
    proxy: {
      '/chat*': {
        target: 'http://localhost:8080',
        secure: false
      }
    }
  }
};

module.exports = config;
