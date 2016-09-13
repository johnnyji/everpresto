const autoprefixer = require('autoprefixer');

// Used to transpile SASS and CSS Modules in `babel-plugin-webpack-loaders`
module.exports = {
  output: {
    // YOU NEED TO SET libraryTarget: 'commonjs2'
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]!postcss'
      }, {
        test: /\.scss$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]!postcss!sass'
      }
    ]
	},
	postcss: [autoprefixer({browsers: ['last 2 versions']})]
};
