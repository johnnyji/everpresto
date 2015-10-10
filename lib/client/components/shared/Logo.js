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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var Logo = (function (_React$Component) {
  _inherits(Logo, _React$Component);

  _createClass(Logo, null, [{
    key: 'propTypes',
    value: {
      iconOnly: _react.PropTypes.bool.isRequired,
      logoClassName: _react.PropTypes.string,
      logoIconClassName: _react.PropTypes.string,
      logoIconSize: _react.PropTypes.string.isRequired,
      logoTextClassName: _react.PropTypes.string,
      onLogoClick: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      iconOnly: true,
      logoIconSize: '30px',
      onLogoClick: function onLogoClick() {}
    },
    enumerable: true
  }]);

  function Logo(props) {
    var _this = this;

    _classCallCheck(this, Logo);

    _get(Object.getPrototypeOf(Logo.prototype), 'constructor', this).call(this, props);

    this._handleClick = function () {
      _this.props.onLogoClick();
    };
  }

  _createClass(Logo, [{
    key: 'render',
    value: function render() {
      var logoClassName = (0, _classnames2['default'])('logo', this.props.logoClassName);
      var logoIconClassName = (0, _classnames2['default'])('logo-icon', this.props.logoIconClassName);
      var logoTextClassName = (0, _classnames2['default'])('logo-text', this.props.logoTextClassName);

      if (this.props.iconOnly) {
        return _react2['default'].createElement(_Icon2['default'], { icon: 'access-time', size: this.props.logoIconSize, iconClass: logoIconClassName });
      }

      return _react2['default'].createElement(
        'div',
        { className: logoClassName, onClick: this._handleClick },
        _react2['default'].createElement(_Icon2['default'], { icon: 'access-time', size: this.props.logoIconSize, iconClass: logoIconClassName }),
        _react2['default'].createElement(
          'span',
          { className: logoTextClassName },
          'Tickit'
        )
      );
    }
  }]);

  return Logo;
})(_react2['default'].Component);

exports['default'] = Logo;
module.exports = exports['default'];