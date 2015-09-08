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

var _utilsAuthHelper = require('../.././utils/AuthHelper');

var _utilsAuthHelper2 = _interopRequireDefault(_utilsAuthHelper);

var _reactRouter = require('react-router');

var _actionsAuthActions = require('../.././actions/AuthActions');

var _actionsAuthActions2 = _interopRequireDefault(_actionsAuthActions);

var _storesAuthStore = require('../.././stores/AuthStore');

var _storesAuthStore2 = _interopRequireDefault(_storesAuthStore);

var HomeHandler = (function (_ReactTemplate) {
  _inherits(HomeHandler, _ReactTemplate);

  function HomeHandler(props) {
    _classCallCheck(this, HomeHandler);

    _get(Object.getPrototypeOf(HomeHandler.prototype), 'constructor', this).call(this, props);
    this.state = { currentUser: _storesAuthStore2['default'].getCurrentUser() };
    this._bindFunctions('_updateState');
  }

  _createClass(HomeHandler, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._unsubscribe = _storesAuthStore2['default'].listen(this._updateState);
      _utilsAuthHelper2['default'].updateCurrentUser();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unsubscribe();
    }
  }, {
    key: '_updateState',
    value: function _updateState(state) {
      this.setState({ currentUser: state.currentUser });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'h1',
          null,
          'Tickit'
        ),
        _react2['default'].createElement(
          'p',
          null,
          'Track and manage time, the better way.'
        ),
        _react2['default'].createElement(
          _reactRouter.Link,
          { to: 'join' },
          'Try for free!'
        )
      );
    }
  }]);

  return HomeHandler;
})(_sharedReactTemplate2['default']);

exports['default'] = HomeHandler;

HomeHandler.defaultProps = {
  currentUser: _storesAuthStore2['default'].getCurrentUser()
};
module.exports = exports['default'];