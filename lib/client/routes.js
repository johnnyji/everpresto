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

var _componentsUserProfileHandler = require('./components/user/ProfileHandler');

var _componentsUserProfileHandler2 = _interopRequireDefault(_componentsUserProfileHandler);

var _componentsContactsContactsHandler = require('./components/contacts/ContactsHandler');

var _componentsContactsContactsHandler2 = _interopRequireDefault(_componentsContactsContactsHandler);

var _componentsSharedNotFoundHandler = require('./components/shared/NotFoundHandler');

var _componentsSharedNotFoundHandler2 = _interopRequireDefault(_componentsSharedNotFoundHandler);

var _componentsAppDashboardHandler = require('./components/app/DashboardHandler');

var _componentsAppDashboardHandler2 = _interopRequireDefault(_componentsAppDashboardHandler);

var _componentsGroupsGroupsHandler = require('./components/groups/GroupsHandler');

var _componentsGroupsGroupsHandler2 = _interopRequireDefault(_componentsGroupsGroupsHandler);

var _componentsNotesNotesHandler = require('./components/notes/NotesHandler');

var _componentsNotesNotesHandler2 = _interopRequireDefault(_componentsNotesNotesHandler);

var routes = _react2['default'].createElement(
  _reactRouter.Route,
  { path: '/', handler: _componentsAppAppHandler2['default'] },
  _react2['default'].createElement(_reactRouter.Redirect, { from: '/groups', to: '/dashboard' }),
  _react2['default'].createElement(_reactRouter.Redirect, { from: '/notes', to: '/dashboard/notes' }),
  _react2['default'].createElement(_reactRouter.Redirect, { from: '/contacts', to: '/dashboard/contacts' }),
  _react2['default'].createElement(_reactRouter.DefaultRoute, { name: 'home', handler: _componentsAppHomeHandler2['default'] }),
  _react2['default'].createElement(_reactRouter.NotFoundRoute, { name: 'notfound', handler: _componentsSharedNotFoundHandler2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { name: 'login', path: '/login', handler: _componentsAuthAuthHandler2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { name: 'join', path: '/join', handler: _componentsAuthAuthHandler2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { name: 'profile', path: '/profile', handler: _componentsUserProfileHandler2['default'] }),
  _react2['default'].createElement(
    _reactRouter.Route,
    { name: 'dashboard', path: '/dashboard', handler: _componentsAppDashboardHandler2['default'] },
    _react2['default'].createElement(_reactRouter.Redirect, { from: '/groups', to: '/dashboard' }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'groups', path: '/dashboard', handler: _componentsGroupsGroupsHandler2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'notes', path: '/dashboard/notes', handler: _componentsNotesNotesHandler2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { name: 'contacts', path: '/dashboard/contacts', handler: _componentsContactsContactsHandler2['default'] })
  )
);

exports['default'] = routes;
module.exports = exports['default'];
/* Redirects from '/dashboard/groups' to 'dashboard' */ /* groups is named the same as dashboard so it defaults to it and 
                                                        activeClass is added to the link component */