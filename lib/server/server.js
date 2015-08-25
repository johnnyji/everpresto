'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _clientRoutes = require('.././client/routes');

var _clientRoutes2 = _interopRequireDefault(_clientRoutes);

var _config = require('.././config');

var _config2 = _interopRequireDefault(_config);

var app = (0, _express2['default'])();

app.set('views', './views');
app.set('view engine', 'jade');

app.get('*', function (req, res) {
  var scriptPath = undefined;
  var stylePath = undefined;

  if (process.env.NODE_ENV === 'production') {
    // scriptPath =
  } else {
      scriptPath = 'http://localhost:' + _config2['default'].webpackPort + '/build/bundle.js';
      stylePath = 'http://localhost:' + _config2['default'].webpackPort + '/build/style.css';
    }

  _reactRouter2['default'].run(_clientRoutes2['default'], req.url, function (Handler) {
    var content = _react2['default'].renderToString(_react2['default'].createElement(Handler, null));
    res.render({
      stylePath: stylePath,
      scriptPath: scriptPath,
      content: content
    });
  });
});

var server = app.listen(_config2['default'].serverPort, function () {
  console.log('App is live and running at http://localhost:', _config2['default'].serverPort);
});