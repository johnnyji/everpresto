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

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _sharedReactTemplate = require('.././shared/ReactTemplate');

var _sharedReactTemplate2 = _interopRequireDefault(_sharedReactTemplate);

var _sharedIcon = require('.././shared/Icon');

var _sharedIcon2 = _interopRequireDefault(_sharedIcon);

var _ContactInviteField = require('./ContactInviteField');

var _ContactInviteField2 = _interopRequireDefault(_ContactInviteField);

var ContactInviteForm = (function (_ReactTemplate) {
  _inherits(ContactInviteForm, _ReactTemplate);

  function ContactInviteForm(props) {
    _classCallCheck(this, ContactInviteForm);

    _get(Object.getPrototypeOf(ContactInviteForm.prototype), 'constructor', this).call(this, props);
    this.state = { inviteFields: [] };
    this._bindFunctions('_addNewField', '_removeField', '_inviteContacts');
  }

  _createClass(ContactInviteForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._addNewField();
    }
  }, {
    key: '_addNewField',
    value: function _addNewField() {
      var fields = this.state.inviteFields;
      fields.push(_react2['default'].createElement(_ContactInviteField2['default'], {
        uuid: _nodeUuid2['default'].v4(),
        key: _nodeUuid2['default'].v4(),
        removeField: this._removeField,
        placeholder: {
          firstName: _faker2['default'].name.firstName(),
          lastName: _faker2['default'].name.lastName(),
          email: _faker2['default'].internet.email()
        }
      }));
      this.setState({ inviteFields: fields });
    }
  }, {
    key: '_removeField',
    value: function _removeField(fieldId) {
      if (this.state.inviteFields.length === 1) return;

      var fields = this.state.inviteFields;
      _lodash2['default'].remove(fields, function (field) {
        return field.props.uuid === fieldId;
      });
      this.setState({ inviteFields: fields });
    }
  }, {
    key: '_inviteContacts',
    value: function _inviteContacts() {
      var inviteFields = _react2['default'].findDOMNode(this.refs.inviteFieldsContainer).children;

      var contacts = _lodash2['default'].map(inviteFields, function (field) {
        var inputs = field.getElementsByTagName('input');
        var firstName = inputs[0].value,
            lastName = inputs[1].value,
            email = inputs[2].value;
        if (email !== '') {
          return {
            firstName: firstName,
            lastName: lastName,
            email: email
          };
        }
      });
      contacts = _lodash2['default'].filter(contacts, function (contact) {
        return typeof contact !== 'undefined';
      });

      this.props.onInviteContacts(contacts);
    }
  }, {
    key: 'render',
    value: function render() {
      var s = this.state;

      return _react2['default'].createElement(
        'div',
        { className: 'contact-invite-form-wrapper' },
        _react2['default'].createElement(
          'table',
          null,
          _react2['default'].createElement(
            'thead',
            null,
            _react2['default'].createElement(
              'tr',
              null,
              _react2['default'].createElement(
                'th',
                null,
                'First Name'
              ),
              _react2['default'].createElement(
                'th',
                null,
                'Last Name'
              ),
              _react2['default'].createElement(
                'th',
                null,
                'Email'
              )
            )
          ),
          _react2['default'].createElement(
            'tbody',
            { ref: 'inviteFieldsContainer' },
            s.inviteFields
          )
        ),
        _react2['default'].createElement(
          'span',
          { className: 'new-field-button', onClick: this._addNewField },
          _react2['default'].createElement(_sharedIcon2['default'], { icon: 'add-circle', size: '60px' })
        ),
        _react2['default'].createElement(
          'button',
          { className: 'invite-contacts-button', onClick: this._inviteContacts },
          _react2['default'].createElement(_sharedIcon2['default'], { icon: 'group-add' }),
          ' Invite Contacts!'
        )
      );
    }
  }]);

  return ContactInviteForm;
})(_sharedReactTemplate2['default']);

exports['default'] = ContactInviteForm;

ContactInviteForm.propTypes = {
  onInviteContacts: _react2['default'].PropTypes.func.isRequired
};
module.exports = exports['default'];