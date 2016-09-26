const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config');
const path = require('path');
const webpack = require('webpack');

const clientConfig = require('./webpack.dev.config.client.js');
const serverConfig = require('./webpack.dev.config.server.js');

const ROOT_PATH = path.join(__dirname, '.././');
const SRC_PATH = path.join(ROOT_PATH, 'src');
const PUBLIC_PATH = path.join(ROOT_PATH, 'public');
const PRESETS = ['es2015', 'stage-0', 'react'];

// TODO: 'undeclared-variables-check' plugin not being used because it will not allow globals like `window`
const PLUGINS = [
  'add-module-exports',
  'handlebars-inline-precompile',
  'transform-decorators-legacy',
  'external-helpers-2',
  'transform-runtime'
];

const opts = {

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

  preLoaders: [
    // {
    //   test: /.js$/,
    //   loader: 'eslint',
    //   include: [SRC_PATH]
    // }
  ],

  loaders: [
    {
      test: /.js$/,
      // Need to parse rxjs
      include: [SRC_PATH],
      loader: 'babel',
      query: {
        presets: PRESETS,
        plugins: PLUGINS
      }
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /.scss$/,
      include: [SRC_PATH],
      loader: ExtractTextPlugin.extract('style', `css?modules&importLoaders=1&localIdentName=${config.cssModulesScopedName}!postcss!sass`)
    }, {
      test: /\.css$/,
      include: [SRC_PATH],
      loader: ExtractTextPlugin.extract('style', `css?modules&importLoaders=1&localIdentName=${config.cssModulesScopedName}!postcss`)
    }, {
      test: /\.(png|jpg)$/,
      include: [PUBLIC_PATH],
      loader: 'url-loader?limit=8192' // inline base64 URLs for <=8k images, direct URLs for the rest
    }, {
      test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
      include: [PUBLIC_PATH],
      loader: 'url-loader?mimetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
      include: [PUBLIC_PATH],
      loader: 'file-loader?name=[name].[ext]'
    }
  ]

};

module.exports = [clientConfig(opts), serverConfig(opts)];
