const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');

const PRESETS = ['es2015', 'stage-0', 'react'];
const PLUGINS = [
  'add-module-exports',
  'handlebars-inline-precompile',
  'transform-decorators-legacy',
  'external-helpers-2',
  'transform-runtime'
];
const ROOT_PATH = path.join(__dirname, '.././');

const config = {
	// Makes sure out webpack output can run in a node.js environment
  target: 'node',

  externals: /^[a-z][a-z\.\-0-9]*$/,

  resolve: {
    extensions: ['', '.js', '.css', '.scss']
  },

  node: {
    __filename: true,
    __dirname: true,
    console: true
  },

  module: {
    loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
          presets: PRESETS,
          plugins: PLUGINS
				}
			}, {
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: 'style!css!postcss!sass'
			}, {
				test: /\.css$/,
				exclude: /node_modules/,
				loader: 'style!css!postcss'
			}
    ]
	},

  postcss: [autoprefixer({browsers: ['last 2 versions']})]

};

// Config used for transpiling `routes/index.js`, so
// the server can use it in `server.js`
const routesConfig = Object.assign({}, config, {
	entry: path.join(ROOT_PATH, 'src/client/routes/index.js'),
  output: {
		path: './lib/client/routes',
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  }
});

// Config used for transpiling `store/configureStore.js`, so
// the server can use it in `server.js`
const configureStoreConfig = Object.assign({}, config, {
	entry: path.join(ROOT_PATH, 'src/client/store/configureStore.js'),
  output: {
		path: './lib/client/store',
    filename: 'configureStore.js',
    libraryTarget: 'commonjs2'
  }
});

const notFoundComponentConfig = Object.assign({}, config, {
	entry: path.join(ROOT_PATH, 'src/client/components/shared/NotFoundHandler.js'),
  output: {
		path: './lib/client/components/shared',
    filename: 'NotFoundHandler.js',
    libraryTarget: 'commonjs2'
  }
});

// Multiple configs are needed in order to have multiple output paths in webpack,
// see: http://stackoverflow.com/questions/35903246/how-to-create-multiple-output-paths-in-webpack-config
module.exports = [routesConfig, configureStoreConfig, notFoundComponentConfig];
