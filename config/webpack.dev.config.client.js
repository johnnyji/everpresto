const autoprefixer = require('autoprefixer');
const config = require('./config');
const path = require('path');

const ROOT_PATH = path.join(__dirname, '.././');

module.exports = function(opts) {
  
  return {
    name: 'Client',

    devtool: 'eval',

    entry: path.join(ROOT_PATH, 'src/client/index.js'),

    output: {
      filename: 'client.js',
      // Adds comments declaring where filenames
      pathinfo: true,
      path: path.join(ROOT_PATH, 'build'),
      // makes the public path for HTML/JavaScript http://localhost:8080/build/somefile.ext
      publicPath: `http://localhost:${config.development.webpackPort}/build/`
    },

    plugins: opts.plugins,

    resolve: opts.resolve,

    module: {
      preLoaders: opts.preLoaders,
      loaders: opts.loaders,
      noParse: /\.min\.js/,
      postcss: [autoprefixer({browsers: ['last 2 versions']})] // autoprefixes CSS with vendor prefixes
    },

    node: {
      fs: 'empty'
    }
  };

};
