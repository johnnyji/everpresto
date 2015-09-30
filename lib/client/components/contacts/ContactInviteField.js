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

var _sharedIcon = require('.././shared/Icon');

var _sharedIcon2 = _interopRequireDefault(_sharedIcon);

var ContactInviteField = (function (_ReactTemplate) {
  _inherits(ContactInviteField, _ReactTemplate);

  function ContactInviteField(props) {
    _classCallCheck(this, ContactInviteField);

    _get(Object.getPrototypeOf(ContactInviteField.prototype), 'constructor', this).call(this, props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null
    };
    this._bindFunctions('_removeField', '_handleEmailChange', '_handleFirstNameChange', '_handleLastNameChange');
  }

  // the uuid prop serves as an indentifier for the field if we later want to remove it

  _createClass(ContactInviteField, [{
    key: '_removeField',
    value: function _removeField() {
      this.props.removeField(this.props.uuid);
    }
  }, {
    key: '_handleFirstNameChange',
    value: function _handleFirstNameChange(e) {
      this.setState({ firstName: e.target.value });
    }
  }, {
    key: '_handleLastNameChange',
    value: function _handleLastNameChange(e) {
      this.setState({ lastName: e.target.value });
    }
  }, {
    key: '_handleEmailChange',
    value: function _handleEmailChange(e) {
      this.setState({ email: e.target.value });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'tr',
        { className: 'contact-invite-field-wrapper' },
        _react2['default'].createElement(
          'td',
          null,
          _react2['default'].createElement('input', { type: 'text', placeholder: 'First Name', onChange: this._handleFirstNameChange })
        ),
        _react2['default'].createElement(
          'td',
          null,
          _react2['default'].createElement('input', { type: 'text', placeholder: 'Last Name', onChange: this._handleLastNameChange })
        ),
        _react2['default'].createElement(
          'td',
          null,
          _react2['default'].createElement('input', { type: 'text', placeholder: 'Email', onChange: this._handleEmailChange }),
          _react2['default'].createElement(
            'span',
            { className: 'exit-icon', onClick: this._removeField },
            _react2['default'].createElement(_sharedIcon2['default'], { icon: 'close' })
          )
        )
      );
    }
  }]);

  return ContactInviteField;
})(_sharedReactTemplate2['default']);

exports['default'] = ContactInviteField;
ContactInviteField.propTypes = {
  removeField: _react2['default'].PropTypes.func.isRequired,
  uuid: _react2['default'].PropTypes.string.isRequired
};
module.exports = exports['default'];