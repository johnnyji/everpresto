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

var _sharedReactTemplate = require('.././shared/ReactTemplate');

var _sharedReactTemplate2 = _interopRequireDefault(_sharedReactTemplate);

var _reactRouter = require('react-router');

var _sharedProtectedComponent = require('.././shared/ProtectedComponent');

var _sharedProtectedComponent2 = _interopRequireDefault(_sharedProtectedComponent);

var _appDashboardNavbar = require('.././app/DashboardNavbar');

var _appDashboardNavbar2 = _interopRequireDefault(_appDashboardNavbar);

var _actionsProjectActions = require('../.././actions/ProjectActions');

var _actionsProjectActions2 = _interopRequireDefault(_actionsProjectActions);

var EmployerDashboard = (function (_ReactTemplate) {
  _inherits(EmployerDashboard, _ReactTemplate);

  function EmployerDashboard() {
    _classCallCheck(this, EmployerDashboard);

    _get(Object.getPrototypeOf(EmployerDashboard.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(EmployerDashboard, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // loads whatever is needed for the employer when their dashboard mounts
      _actionsProjectActions2['default'].loadProjects();
    }
  }, {
    key: 'render',
    value: function render() {
      var navLinks = [{ path: '/dashboard', displayName: 'Projects' }, { path: '/dashboard/employees', displayName: 'Employees' }];

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(_appDashboardNavbar2['default'], { links: navLinks }),
        _react2['default'].createElement(_reactRouter.RouteHandler, null)
      );
    }
  }]);

  return EmployerDashboard;
})(_sharedReactTemplate2['default']);

exports['default'] = (0, _sharedProtectedComponent2['default'])(EmployerDashboard);
module.exports = exports['default'];