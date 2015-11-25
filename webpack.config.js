var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./config');

var srcPath = path.resolve(__dirname, './src/client');

module.exports = {
  entry: path.resolve(__dirname, './src/client/index.js'),
  output: {
    path: path.resolve(__dirname, './build'),
    // makes the public path for HTML/JavaScript http://localhost:8080/build/somefile.ext, needed for isomorphic hot module replacement
    publicPath: 'http://localhost:' + config.development.webpackPort + '/build/',
    filename: 'bundle.js'
  },
  plugins: [
    new ExtractTextPlugin('style.css', {allChunks: true})
  ],
  // resolve: {
  //   fallback: [
  //     path.join(__dirname, '/src/client'),
  //     path.join(__dirname, '/src/server'),
  //     path.join(__dirname, '/node_modules')
  //   ]  
  // },
  module: {
    loaders: [
      { 
        test: /.js$/, 
        include: [srcPath], 
        loaders: ['react-hot-loader', 'babel-loader?stage=0']
        // query: {
        //   cacheDirectory: true,
        //   presets: ['es2015', 'stage-1', 'react'],
        //   plugins: ['external-helpers-2', 'transform-runtime']
        // }
      },
      { 
        test: /.scss$/,
        include: [srcPath],
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      },
      { 
        test: /\.css$/,  
        loader: 'style!css' 
      },
      { 
        test: /\.(gif)$/, 
        loader: 'url-loader?mimetype=image/png'
      },
      { 
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, 
        loader: 'url-loader?mimetype=application/font-woff' 
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, 
        loader: 'file-loader?name=[name].[ext]' 
      }
    ]
  }
};