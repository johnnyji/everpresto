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
		// TODO: `libraryTarget` which is required for `babel-plugin-webpack-loaders`, might be
		// causing a `module is not defined` error. Investigate
		// libraryTarget: 'commonjs2',
    path: path.join(ROOT_PATH, 'build'),
    // makes the public path for HTML/JavaScript http://localhost:8080/build/somefile.ext
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
        include: [SRC_PATH],
        loader: ExtractTextPlugin.extract('style', `css?modules&importLoaders=1&localIdentName=${config.cssModulesScopedName}!postcss!sass`)
      }, {
        test: /\.css$/,
        include: [SRC_PATH],
        loader: `style!css?modules&importLoaders=1&localIdentName=${config.cssModulesScopedName}!postcss`
      }, {
        test: /\.(gif)$/,
        include: [SRC_PATH],
        loader: 'url-loader?mimetype=image/png'
      }, {
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
        include: [SRC_PATH],
        loader: 'url-loader?mimetype=application/font-woff'
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
        include: [SRC_PATH],
        loader: 'file-loader?name=[name].[ext]'
      }
    ],

    noParse: /\.min\.js/,

    // autoprefixes CSS with vendor prefixes
    postcss: [autoprefixer({browsers: ['last 2 versions']})]

  },

  node: {
    fs: 'empty'
  }

};
