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

var DropdownOptions = (function (_React$Component) {
  _inherits(DropdownOptions, _React$Component);

  _createClass(DropdownOptions, null, [{
    key: 'propTypes',
    value: {
      dropdownOptionsClassName: _react.PropTypes.string,
      onShowOptions: _react.PropTypes.func.isRequired,
      onHideOptions: _react.PropTypes.func.isRequired,
      options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        name: _react.PropTypes.string.isRequired,
        callback: _react.PropTypes.func.isRequired
      })).isRequired,
      showDropdownOptions: _react.PropTypes.bool.isRequired
    },
    enumerable: true
  }]);

  function DropdownOptions(props) {
    _classCallCheck(this, DropdownOptions);

    _get(Object.getPrototypeOf(DropdownOptions.prototype), 'constructor', this).call(this, props);
  }

  _createClass(DropdownOptions, [{
    key: 'render',
    value: function render() {
      // If showDropdownOptions is false, the menu is not shown to begin with.
      if (!this.props.showDropdownOptions) return _react2['default'].createElement('div', null);

      var dropdownOptionsClasses = (0, _classnames2['default'])('dropdown-options', this.props.dropdownOptionsClassName);
      var options = this.props.options.map(function (option, i) {
        return _react2['default'].createElement(
          'li',
          {
            className: 'dropdown-options-item',
            key: i,
            onClick: option.callback },
          option.name
        );
      });

      return _react2['default'].createElement(
        'ul',
        {
          className: dropdownOptionsClasses,
          onMouseEnter: this.props.onShowOptions,
          onMouseLeave: this.props.onHideOptions },
        options
      );
    }
  }]);

  return DropdownOptions;
})(_react2['default'].Component);

exports['default'] = DropdownOptions;
module.exports = exports['default'];