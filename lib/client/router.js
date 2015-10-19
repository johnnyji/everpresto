'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _historyLibCreateBrowserHistory = require('history/lib/createBrowserHistory');

var _historyLibCreateBrowserHistory2 = _interopRequireDefault(_historyLibCreateBrowserHistory);

var _componentsAppAppHandler = require('./components/app/AppHandler');

var _componentsAppAppHandler2 = _interopRequireDefault(_componentsAppAppHandler);

var _componentsAuthAuthHandler = require('./components/auth/AuthHandler');

var _componentsAuthAuthHandler2 = _interopRequireDefault(_componentsAuthAuthHandler);

var _componentsContactsContactsHandler = require('./components/contacts/ContactsHandler');

var _componentsContactsContactsHandler2 = _interopRequireDefault(_componentsContactsContactsHandler);

var _componentsAppDashboardHandler = require('./components/app/DashboardHandler');

var _componentsAppDashboardHandler2 = _interopRequireDefault(_componentsAppDashboardHandler);

var _componentsGroupsGroupsHandler = require('./components/groups/GroupsHandler');

var _componentsGroupsGroupsHandler2 = _interopRequireDefault(_componentsGroupsGroupsHandler);

var _componentsAppLandingPageHandler = require('./components/app/LandingPageHandler');

var _componentsAppLandingPageHandler2 = _interopRequireDefault(_componentsAppLandingPageHandler);

var _componentsNotesNotesHandler = require('./components/notes/NotesHandler');

var _componentsNotesNotesHandler2 = _interopRequireDefault(_componentsNotesNotesHandler);

var _componentsSharedNotFoundHandler = require('./components/shared/NotFoundHandler');

var _componentsSharedNotFoundHandler2 = _interopRequireDefault(_componentsSharedNotFoundHandler);

var _componentsUserProfileHandler = require('./components/user/ProfileHandler');

var _componentsUserProfileHandler2 = _interopRequireDefault(_componentsUserProfileHandler);

var _storesAuthStore = require('./stores/AuthStore');

var _storesAuthStore2 = _interopRequireDefault(_storesAuthStore);

// Passed to every protected route component's onEnter to check if the current user
// is authenticated. Replaces the route with /login if the user is unauthenticated.
var authenticateUser = function authenticateUser(nextState, replaceState) {
  debugger;
  if (!_storesAuthStore2['default'].getCurrentUser()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
};

var routes = _react2['default'].createElement(
  Router,
  { history: (0, _historyLibCreateBrowserHistory2['default'])() },
  _react2['default'].createElement(
    _reactRouter.Route,
    { component: _componentsAppAppHandler2['default'], path: '/' },
    _react2['default'].createElement(_reactRouter.Redirect, { from: '/groups', to: '/dashboard' }),
    _react2['default'].createElement(_reactRouter.Redirect, { from: '/notes', to: '/dashboard/notes' }),
    _react2['default'].createElement(_reactRouter.Redirect, { from: '/contacts', to: '/dashboard/contacts' }),
    _react2['default'].createElement(_reactRouter.IndexRoute, { component: _componentsAppLandingPageHandler2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { component: _componentsSharedNotFoundHandler2['default'], path: '*' }),
    _react2['default'].createElement(_reactRouter.Route, { component: _componentsAuthAuthHandler2['default'], path: '/login' }),
    _react2['default'].createElement(_reactRouter.Route, { component: _componentsAuthAuthHandler2['default'], path: '/join' }),
    _react2['default'].createElement(_reactRouter.Route, { path: '/profile', component: _componentsUserProfileHandler2['default'], onEnter: authenticateUser }),
    _react2['default'].createElement(
      _reactRouter.Route,
      { path: '/dashboard', component: _componentsAppDashboardHandler2['default'], onEnter: authenticateUser },
      _react2['default'].createElement(_reactRouter.Redirect, { from: '/groups', to: '/dashboard' }),
      _react2['default'].createElement(_reactRouter.Route, { path: '/dashboard', component: _componentsGroupsGroupsHandler2['default'] }),
      _react2['default'].createElement(_reactRouter.Route, { path: '/dashboard/notes', component: _componentsNotesNotesHandler2['default'] }),
      _react2['default'].createElement(_reactRouter.Route, { path: '/dashboard/contacts', component: _componentsContactsContactsHandler2['default'] })
    )
  )
);

exports['default'] = routes;
module.exports = exports['default'];
/*Route for Not Found page.*/ /* PROTECTED ROUTES: Requires an authenticated user to access */ /* Redirects from '/dashboard/groups' to 'dashboard' */ /* groups is named the same as dashboard so it defaults to it and 
                                                                                                                                                       activeClass is added to the link component */