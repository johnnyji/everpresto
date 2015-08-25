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

var _componentsTimesheetTimesheetHandler = require('./components/timesheet/TimesheetHandler');

var _componentsTimesheetTimesheetHandler2 = _interopRequireDefault(_componentsTimesheetTimesheetHandler);

var _componentsSharedNotFoundHandler = require('./components/shared/NotFoundHandler');

var _componentsSharedNotFoundHandler2 = _interopRequireDefault(_componentsSharedNotFoundHandler);

var routes = _react2['default'].createElement(
  _reactRouter.Route,
  { path: '/', handler: _componentsAppAppHandler2['default'] },
  _react2['default'].createElement(_reactRouter.DefaultRoute, { handler: _componentsTimesheetTimesheetHandler2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: '/timesheets', handler: _componentsTimesheetTimesheetHandler2['default'] }),
  _react2['default'].createElement(_reactRouter.NotFoundRoute, { handler: _componentsSharedNotFoundHandler2['default'] })
);

exports['default'] = routes;
module.exports = exports['default'];