'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('../.././node_modules/react-widgets/dist/css/react-widgets.css');

// import styles for react widgets package

require('./scss/style.scss');

//imports the styles

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _componentsAppAppFooter = require('./components/app/AppFooter');

var _componentsAppAppFooter2 = _interopRequireDefault(_componentsAppAppFooter);

_reactRouter2['default'].run(_routes2['default'], _reactRouter2['default'].HistoryLocation, function (Handler) {
  _react2['default'].render(_react2['default'].createElement(Handler, null), document.getElementById('app'));
});

_react2['default'].render(_react2['default'].createElement(_componentsAppAppFooter2['default'], null), document.getElementById('app-footer'));