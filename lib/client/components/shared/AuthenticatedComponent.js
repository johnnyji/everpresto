'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storesAuthStore = require('../.././stores/AuthStore');

var _storesAuthStore2 = _interopRequireDefault(_storesAuthStore);

var _storesAppStore = require('../.././stores/AppStore');

var _storesAppStore2 = _interopRequireDefault(_storesAppStore);

// wrapper womponent for protecting authenticated components

exports['default'] = function (ComponentToBeRendered) {
  return (function (_React$Component) {
    _inherits(AuthenticatedComponent, _React$Component);

    _createClass(AuthenticatedComponent, null, [{
      key: 'willTransitionTo',

      // called before transitioning to component, will redirect user to login if unauthenticated
      value: function willTransitionTo(transition) {
        if (!_storesAuthStore2['default'].isLoggedIn()) {
          transition.redirect('/login');
        }
      }
    }]);

    function AuthenticatedComponent(props) {
      _classCallCheck(this, AuthenticatedComponent);

      _get(Object.getPrototypeOf(AuthenticatedComponent.prototype), 'constructor', this).call(this, props);
      this.state = {
        currentUser: _storesAppStore2['default'].getCurrentUser(),
        apiToken: _storesAppStore2['default'].getApiToken()
      };
      this._updateState = this._updateState.bind(this);
    }

    _createClass(AuthenticatedComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this._unsubscribe = _storesAppStore2['default'].listen(this._updateState);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this._unsubscribe();
      }
    }, {
      key: '_updateState',
      value: function _updateState(state) {
        this.setState({
          currentUser: state.currentUser,
          apiToken: state.apiToken
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(ComponentToBeRendered, _extends({}, this.props, {
          currentUser: this.state.currentUser,
          apiToken: this.state.apiToken
        }));
      }
    }]);

    return AuthenticatedComponent;
  })(_react2['default'].Component);
};

module.exports = exports['default'];