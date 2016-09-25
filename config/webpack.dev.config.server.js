const autoprefixer = require('autoprefixer');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.join(__dirname, '.././');

module.exports = function(opts) {

  return {
    name: 'Server',

    devtool: 'cheap-module-source-map',

    entry: path.join(ROOT_PATH, 'src/server/server.js'),

    libraryTarget: 'commonjs',

    target: 'node',

    externals: [nodeExternals()],

    output: {
      filename: 'server.js',
      path: path.join(ROOT_PATH, 'build')
    },

    plugins: opts.plugins.concat([
      // TODO: Not too sure what this does, investigate more at: http://jlongster.com/Backend-Apps-with-Webpack--Part-I
      new webpack.BannerPlugin('require("source-map-support").install();', {raw: true, entryOnly: false})
    ]),

    resolve: opts.resolve,

    module: {
      preLoaders: opts.preLoaders,
      loaders: opts.loaders,
      noParse: /\.min\.js/,
      postcss: [autoprefixer({browsers: ['last 2 versions']})] // autoprefixes CSS with vendor prefixes
    }
  };

};
