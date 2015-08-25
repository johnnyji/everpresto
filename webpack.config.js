var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var srcPath = path.resolve(__dirname, './src/client');

module.exports = {
  entry: path.resolve(__dirname, './src/client/index.js'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /.js$/, 
        include: [srcPath], 
        loader: 'react-hot!babel'
      },
      { 
        test: /.scss$/,
        include: [srcPath],
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      },
      { 
        test: /\.css$/,  
        loader: 'style-loader!css-loader' 
      },
      { 
        test: /\.gif$/, 
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
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
};