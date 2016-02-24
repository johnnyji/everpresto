// var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./config');
var path = require('path');

var SRC_PATH = path.resolve(__dirname, './src/client');
var PRESETS = ['es2015', 'stage-0', 'react'];
var PLUGINS = ['undeclared-variables-check', 'external-helpers-2', 'transform-runtime'];

module.exports = {
  entry: path.resolve(__dirname, './src/client/index.js'),
  output: {
    publicPath: 'http://localhost:' + config.development.webpackPort + '/build/',
    path: path.resolve(__dirname, './build'),
    // makes the public path for HTML/JavaScript http://localhost:8080/build/somefile.ext, needed for isomorphic hot module replacement
    filename: 'bundle.js'
  },
  plugins: [
    new ExtractTextPlugin('style.css', {allChunks: true})
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss'],
    modulesDirectories: [
      // So we can import WITHOUT FS navigation (ie. '../.././')
      'src',
      'node_modules',
      'web_modules'
    ],
    fallback: [
      path.resolve(__dirname, './src/client'),
      path.resolve(__dirname, './src/server'),
      path.resolve(__dirname, './node_modules')
    ]
  },
  module: {
    loaders: [
      { 
        test: /.js$/, 
        include: [SRC_PATH],
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: PRESETS,
          plugins: PLUGINS
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, { 
        test: /.scss$/,
        include: [SRC_PATH],
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      }, { 
        test: /\.css$/,  
        loader: 'style!css'
      }, { 
        test: /\.(gif)$/, 
        loader: 'url-loader?mimetype=image/png'
      }, { 
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, 
        loader: 'url-loader?mimetype=application/font-woff'
      }, { 
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, 
        loader: 'file-loader?name=[name].[ext]' 
      }
    ],
    noParse: /\.min\.js/,
    // postLoaders: [
    //   {
    //     test: /\.js$/,
    //     include: [SRC_PATH],
    //     loader: 'babel',
    //     query: {
    //       cacheDirectory: true,
    //       presets: PRESETS.concat(['react-hmre'])
    //     }
    //   }
    // ]
  },
  node: {
    __dirname: true,
    fs: 'empty'
  }
};