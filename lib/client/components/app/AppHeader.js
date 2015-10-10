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

var _reactRouter = require('react-router');

var _actionsAuthActions = require('../.././actions/AuthActions');

var _actionsAuthActions2 = _interopRequireDefault(_actionsAuthActions);

var _storesAuthStore = require('../.././stores/AuthStore');

var _storesAuthStore2 = _interopRequireDefault(_storesAuthStore);

var _sharedLogo = require('.././shared/Logo');

var _sharedLogo2 = _interopRequireDefault(_sharedLogo);

var _uxDropdownOptions = require('.././ux/DropdownOptions');

var _uxDropdownOptions2 = _interopRequireDefault(_uxDropdownOptions);

var AppHeader = (function (_React$Component) {
  _inherits(AppHeader, _React$Component);

  _createClass(AppHeader, null, [{
    key: 'propTypes',

    // inherited from ProtectedComponent wrapper
    value: {
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

    // Allows for this.context.router to assume the role of the React Router
    enumerable: true
  }, {
    key: 'contextTypes',
    value: {
      router: _react.PropTypes.func
    },
    enumerable: true
  }]);

  function AppHeader(props) {
    var _this = this;

    _classCallCheck(this, AppHeader);

    _get(Object.getPrototypeOf(AppHeader.prototype), 'constructor', this).call(this, props);

    this._handleLogoClick = function () {
      if (_this.context.router.getCurrentPath() !== '/dashboard') {
        _this.context.router.transitionTo('/dashboard');
      }
    };

    this._hideProfileOptions = function () {
      _this.setState({ showProfileOptions: false });
    };

    this._logoutUser = function () {
      _this._hideProfileOptions();
      _actionsAuthActions2['default'].logoutUser();
    };

    this._showProfileOptions = function () {
      _this.setState({ showProfileOptions: true });
    };

    this._viewProfile = function () {
      _this._hideProfileOptions();
      _this.context.router.transitionTo('profile');
    };

    this.state = { showProfileOptions: false };
  }

  _createClass(AppHeader, [{
    key: 'render',
    value: function render() {
      var headerNavContent = undefined;
      var profileNavOptions = undefined;

      // If the current user is present, we're setting the nav content to their profile picture
      // and profile options. Otherwise it will default to Login and Register buttons
      if (this.props.currentUser) {
        profileNavOptions = [{ name: 'Profile Settings', callback: this._viewProfile }, { name: 'Logout', callback: this._logoutUser }];
        headerNavContent = _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            _reactRouter.Link,
            { to: 'profile' },
            _react2['default'].createElement('img', { className: 'app-header-nav-profile-pic', src: this.props.currentUser.profilePictureUrl })
          ),
          _react2['default'].createElement(
            'span',
            {
              className: 'app-header-nav-user-email',
              onMouseEnter: this._showProfileOptions,
              onMouseLeave: this._hideProfileOptions },
            this.props.currentUser.email
          ),
          _react2['default'].createElement(_uxDropdownOptions2['default'], {
            dropdownOptionsClassName: 'app-header-nav-profile-dropdown-options',
            onShowOptions: this._showProfileOptions,
            onHideOptions: this._hideProfileOptions,
            options: profileNavOptions,
            showDropdownOptions: this.state.showProfileOptions })
        );
      } else {
        headerNavContent = _react2['default'].createElement(
          'div',
          null,
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
        );
      }

      return _react2['default'].createElement(
        'header',
        { className: 'app-header' },
        _react2['default'].createElement(_sharedLogo2['default'], {
          iconOnly: false,
          logoClassName: 'pull-left app-header-logo',
          logoIconSize: '2.2rem',
          logoIconClassName: 'app-header-logo-icon',
          onLogoClick: this._handleLogoClick }),
        _react2['default'].createElement(
          'div',
          { className: 'pull-right app-header-nav' },
          headerNavContent
        )
      );
    }
  }]);

  return AppHeader;
})(_react2['default'].Component);

exports['default'] = AppHeader;
module.exports = exports['default'];