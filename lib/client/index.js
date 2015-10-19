'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('./scss/style.scss');

//imports the styles

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _utilsRouterContainer = require('./utils/RouterContainer');

var _utilsRouterContainer2 = _interopRequireDefault(_utilsRouterContainer);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

// sets the router instance in the RouterContainer, so the routes can be accessed by util classes and Reflux
_utilsRouterContainer2['default'].set(_routes2['default']);

// Renders the routes to the DOM
(0, _reactDom.render)(_routes2['default'], document.getElementById('app'));