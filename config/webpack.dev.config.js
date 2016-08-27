const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config');
const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.join(__dirname, '.././');
const SRC_PATH = path.join(ROOT_PATH, 'src/client');
const PRESETS = ['es2015', 'stage-0', 'react'];
// TODO: 'undeclared-variables-check' plugin not being used because it will not allow globals like `window`
const PLUGINS = [
  'add-module-exports',
  'handlebars-inline-precompile',
  'transform-decorators-legacy',
  'external-helpers-2',
  'transform-runtime'
];

module.exports = {
  entry: path.join(ROOT_PATH, 'src/client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(ROOT_PATH, 'build'),
    // makes the public path for HTML/JavaScript http://localhost:8080/build/somefile.ext, needed for isomorphic hot module replacement
    publicPath: `http://localhost:${config.development.webpackPort}/build/`
  },
  plugins: [
    // Extracts styles
    new ExtractTextPlugin('style.css', {allChunks: true}),
    // Polyfills `fetch`
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  resolve: {
    // TODO: Unfortunately this won't work for us because we're rendering on the server first,
    // which won't be parsed by this webpack file...
    //
    // Allows import relative to the `src` folder instead of having to do '../.././'
    // modulesDirectories: ['src', 'node_modules', 'web_modules'],
    // fallback: [
    //   path.join(ROOT_PATH, 'src/client'),
    //   path.join(ROOT_PATH, 'src/server'),
    //   path.join(ROOT_PATH, 'node_modules')
    // ],
    extensions: ['', '.js', '.jsx', '.json', '.scss']
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        // Need to parse rxjs
        include: [SRC_PATH],
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: PRESETS,
          plugins: PLUGINS
        }
      }, {
        test: /\.json$/,
        include: [SRC_PATH],
        loader: 'json-loader'
      }, {
        test: /.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      }, {
        test: /\.css$/,
        loader: 'style!css!postcss'
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
    // autoprefixes CSS with vendor prefixes
    postcss: [autoprefixer({browsers: ['last 2 versions']})]
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
  // Fixes the empty `fs` module error
  node: {
    fs: 'empty'
  }
};
