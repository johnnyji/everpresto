var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/index.js'),
    vendors: ['react'] // seperates external libraries into vendor bundles
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      { 
        test: /.scss$/, 
        exclude: /node_modules/, 
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      }
    ]
  },
  plugins: [
    // allows for chunking library build files into vendors.js
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
};