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

var Spinner = (function (_React$Component) {
  _inherits(Spinner, _React$Component);

  function Spinner() {
    _classCallCheck(this, Spinner);

    _get(Object.getPrototypeOf(Spinner.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Spinner, [{
    key: 'render',
    value: function render() {
      var p = this.props;
      var spinnerMainId = p.fullScreen ? 'full-screen-spinner' : '';
      var spinnerRectClass = p.fullScreen ? 'spinner-rect' : '';

      if (p.fullScreen) {
        var quote = p.quote || p.defaultQuotes[Math.floor(Math.random() * p.defaultQuotes.length)];
        return _react2['default'].createElement(
          'div',
          { className: 'spinner-wrapper' },
          _react2['default'].createElement(
            'div',
            { className: 'wave spinner center-spinner', id: 'full-screen-spinner' },
            _react2['default'].createElement('div', { className: 'rect1 full-screen-spinner-rect' }),
            _react2['default'].createElement('div', { className: 'rect2 full-screen-spinner-rect' }),
            _react2['default'].createElement('div', { className: 'rect3 full-screen-spinner-rect' }),
            _react2['default'].createElement('div', { className: 'rect4 full-screen-spinner-rect' }),
            _react2['default'].createElement('div', { className: 'rect5 full-screen-spinner-rect' })
          ),
          _react2['default'].createElement(
            'h3',
            { className: 'quote' },
            quote
          )
        );
      } else {
        return _react2['default'].createElement(
          'div',
          { className: 'wave spinner center-spinner' },
          _react2['default'].createElement('div', { className: 'rect1' }),
          _react2['default'].createElement('div', { className: 'rect2' }),
          _react2['default'].createElement('div', { className: 'rect3' }),
          _react2['default'].createElement('div', { className: 'rect4' }),
          _react2['default'].createElement('div', { className: 'rect5' })
        );
      }
    }
  }]);

  return Spinner;
})(_react2['default'].Component);

exports['default'] = Spinner;

Spinner.propTypes = {
  fullScreen: _react2['default'].PropTypes.bool,
  quote: _react2['default'].PropTypes.string
};

Spinner.defaultProps = {
  defaultQuotes: ["Money isn't important, but having it, that's a different question."]
};
module.exports = exports['default'];