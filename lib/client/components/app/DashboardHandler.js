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

var _EmployeeDashboard = require('./EmployeeDashboard');

var _EmployeeDashboard2 = _interopRequireDefault(_EmployeeDashboard);

var _EmployerDashboard = require('./EmployerDashboard');

var _EmployerDashboard2 = _interopRequireDefault(_EmployerDashboard);

var DashboardHandler = (function (_React$Component) {
  _inherits(DashboardHandler, _React$Component);

  function DashboardHandler(props) {
    _classCallCheck(this, DashboardHandler);

    _get(Object.getPrototypeOf(DashboardHandler.prototype), 'constructor', this).call(this, props);
  }

  _createClass(DashboardHandler, [{
    key: 'render',
    value: function render() {
      var p = this.props;

      if (p.currentUser.isEmployee) {
        return _react2['default'].createElement(_EmployeeDashboard2['default'], { currentUser: p.currentUser });
      } else if (p.currentUser.isEmployer) {
        return _react2['default'].createElement(_EmployerDashboard2['default'], { currentUser: p.currentUser });
      }
    }
  }]);

  return DashboardHandler;
})(_react2['default'].Component);

DashboardHandler.propTypes = {
  currentUser: _react2['default'].PropTypes.any,
  apiToken: _react2['default'].PropTypes.any
};

exports['default'] = (0, _sharedProtectedComponent2['default'])(DashboardHandler);
module.exports = exports['default'];