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

var _actionsAppActions = require('../.././actions/AppActions');

var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

var _storesAuthStore = require('../.././stores/AuthStore');

var _storesAuthStore2 = _interopRequireDefault(_storesAuthStore);

var _sharedIcon = require('.././shared/Icon');

var _sharedIcon2 = _interopRequireDefault(_sharedIcon);

var AppHeader = (function (_ReactTemplate) {
  _inherits(AppHeader, _ReactTemplate);

  function AppHeader(props) {
    _classCallCheck(this, AppHeader);

    _get(Object.getPrototypeOf(AppHeader.prototype), 'constructor', this).call(this, props);
    this._bindFunctions('_logoutUser');
  }

  _createClass(AppHeader, [{
    key: '_logoutUser',
    value: function _logoutUser() {
      debugger;
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var headerContent = undefined;

      if (p.currentUser) {
        return _react2['default'].createElement(
          'header',
          { className: 'app-header-wrapper' },
          _react2['default'].createElement(
            _reactRouter.Link,
            { className: 'pull-left logo', to: '/dashboard' },
            _react2['default'].createElement(_sharedIcon2['default'], { icon: 'access-time', size: '3rem' }),
            'Tickit'
          ),
          _react2['default'].createElement(
            'div',
            { className: 'pull-right' },
            _react2['default'].createElement(
              _reactRouter.Link,
              { to: 'profile' },
              'Profile'
            ),
            _react2['default'].createElement(
              'span',
              { onClick: this._logoutUser },
              'Logout'
            )
          )
        );
      } else {
        return _react2['default'].createElement(
          'header',
          { className: 'app-header-wrapper' },
          _react2['default'].createElement(
            _reactRouter.Link,
            { className: 'pull-left logo', to: '/' },
            _react2['default'].createElement(_sharedIcon2['default'], { icon: 'access-time', size: '3rem' }),
            'Tickit'
          ),
          _react2['default'].createElement(
            'div',
            { className: 'pull-right' },
            _react2['default'].createElement(
              _reactRouter.Link,
              { to: 'login' },
              'Login'
            ),
            _react2['default'].createElement(
              _reactRouter.Link,
              { to: 'join' },
              'Join'
            )
          )
        );
      }
    }
  }]);

  return AppHeader;
})(_sharedReactTemplate2['default']);

exports['default'] = AppHeader;

AppHeader.propTypes = {
  currentUser: _react2['default'].PropTypes.any
};
module.exports = exports['default'];