'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sharedProtectedComponent = require('.././shared/ProtectedComponent');

var _sharedProtectedComponent2 = _interopRequireDefault(_sharedProtectedComponent);

var _uxHorizontalNavbar = require('.././ux/HorizontalNavbar');

var _uxHorizontalNavbar2 = _interopRequireDefault(_uxHorizontalNavbar);

var _actionsAppActions = require('../.././actions/AppActions');

var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

exports['default'] = (0, _sharedProtectedComponent2['default'])((function (_React$Component) {
  _inherits(DashboardHandler, _React$Component);

  _createClass(DashboardHandler, null, [{
    key: 'propTypes',

    // Both apiToken and currentUser come from the ProtectedComponent decorator
    value: {
      apiToken: _react.PropTypes.string,
      currentUser: _react.PropTypes.shape({
        _id: _react.PropTypes.string.isRequired,
        createdAt: _react.PropTypes.string,
        email: _react.PropTypes.string,
        groupPreviews: _react.PropTypes.arrayOf(_react.PropTypes.shape({
          name: _react.PropTypes.string.isRequired,
          iconUrl: _react.PropTypes.string.isRequired
        })),
        profilePictureUrl: _react.PropTypes.string.isRequired,
        updatedAt: _react.PropTypes.string
      })
    },
    enumerable: true
  }]);

  function DashboardHandler(props) {
    _classCallCheck(this, DashboardHandler);

    _get(Object.getPrototypeOf(DashboardHandler.prototype), 'constructor', this).call(this, props);
  }

  _createClass(DashboardHandler, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _actionsAppActions2['default'].loadInitialDashboardData();
    }
  }, {
    key: 'render',
    value: function render() {
      var navLinks = [{ path: '/dashboard', name: 'Groups' }, { path: '/dashboard/notes', name: 'Notes' }, { path: '/dashboard/contacts', name: 'Contacts' }];

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(_uxHorizontalNavbar2['default'], { navLinks: navLinks }),
        this.props.children
      );
    }
  }]);

  return DashboardHandler;
})(_react2['default'].Component));
module.exports = exports['default'];
/*Allows the React Router to run the correct child route,
replaced RouteHandler in v1.0.0*/