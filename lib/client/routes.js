'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _componentsAppAppHandler = require('./components/app/AppHandler');

var _componentsAppAppHandler2 = _interopRequireDefault(_componentsAppAppHandler);

var _componentsAppHomeHandler = require('./components/app/HomeHandler');

var _componentsAppHomeHandler2 = _interopRequireDefault(_componentsAppHomeHandler);

var _componentsAuthAuthHandler = require('./components/auth/AuthHandler');

var _componentsAuthAuthHandler2 = _interopRequireDefault(_componentsAuthAuthHandler);

var _componentsTimesheetTimesheetHandler = require('./components/timesheet/TimesheetHandler');

var _componentsTimesheetTimesheetHandler2 = _interopRequireDefault(_componentsTimesheetTimesheetHandler);

var _componentsSharedNotFoundHandler = require('./components/shared/NotFoundHandler');

var _componentsSharedNotFoundHandler2 = _interopRequireDefault(_componentsSharedNotFoundHandler);

var routes = _react2['default'].createElement(
  _reactRouter.Route,
  { path: '/', handler: _componentsAppAppHandler2['default'] },
  _react2['default'].createElement(_reactRouter.DefaultRoute, { name: 'home', handler: _componentsAppHomeHandler2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { name: 'login', path: '/login', handler: _componentsAuthAuthHandler2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { name: 'join', path: '/join', handler: _componentsAuthAuthHandler2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { name: 'timesheets', path: '/timesheets', handler: _componentsTimesheetTimesheetHandler2['default'] }),
  _react2['default'].createElement(_reactRouter.NotFoundRoute, { name: 'notfound', handler: _componentsSharedNotFoundHandler2['default'] })
);

exports['default'] = routes;
module.exports = exports['default'];