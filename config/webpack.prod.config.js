// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var webpack = require('webpack');
// var path = require('path');

// module.exports = {
//   entry: {
//     app: path.resolve(__dirname, './src/client/index.js'),
//     vendors: ['react', 'reflux', 'react-widgets'] // seperates external libraries into vendor bundles
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'app.js'
//   },
//   module: {
//     loaders: [
//       {
//         test: /.js$/,
//         exclude: /node_modules/,
//         loader: 'babel'
//       },
//       { 
//         test: /.scss$/, 
//         exclude: /node_modules/, 
//         loader: ExtractTextPlugin.extract('style', 'css!sass')
//       },
//       { 
//         test: /\.css$/,  
//         loader: "style-loader!css-loader" 
//       },
//       { 
//         test: /\.gif$/, 
//         loader: "url-loader?mimetype=image/png" 
//       },
//       { 
//         test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, 
//         loader: "url-loader?mimetype=application/font-woff" 
//       },
//       { 
//         test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, 
//         loader: "file-loader?name=[name].[ext]" 
//       }
//     ]
//   },
//   plugins: [
//     // allows for chunking library build files into vendors.js
//     new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
//     new ExtractTextPlugin('style.css', { allChunks: true })
//   ]
// };