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

var _utilsRouterContainer = require('./utils/RouterContainer');

var _utilsRouterContainer2 = _interopRequireDefault(_utilsRouterContainer);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _actionsAuthActions = require('./actions/AuthActions');

var _actionsAuthActions2 = _interopRequireDefault(_actionsAuthActions);

var _componentsAppAppFooter = require('./components/app/AppFooter');

var _componentsAppAppFooter2 = _interopRequireDefault(_componentsAppAppFooter);

// creates the router instance
var router = _reactRouter2['default'].create({
  routes: _routes2['default'],
  location: _reactRouter2['default'].HistoryLocation
});

// sets the router instance in the RouterContainer, so the routes can be accessed by util classes and Reflux
_utilsRouterContainer2['default'].set(router);

// logins in the user using JWT if it exists before the app even renders
var jwt = localStorage.getItem('jwt');
if (jwt) _actionsAuthActions2['default'].loginUser(jwt);

// runs the router after the user has been logged in.
router.run(function (Handler) {
  _react2['default'].render(_react2['default'].createElement(Handler, null), document.getElementById('app'));
});

_react2['default'].render(_react2['default'].createElement(_componentsAppAppFooter2['default'], null), document.getElementById('app-footer'));