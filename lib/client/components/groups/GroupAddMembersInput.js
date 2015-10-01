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

var _sharedReactTemplate = require('.././shared/ReactTemplate');

var _sharedReactTemplate2 = _interopRequireDefault(_sharedReactTemplate);

var _contactsContactInviteForm = require('.././contacts/ContactInviteForm');

var _contactsContactInviteForm2 = _interopRequireDefault(_contactsContactInviteForm);

var GroupAddMembersInput = (function (_ReactTemplate) {
  _inherits(GroupAddMembersInput, _ReactTemplate);

  function GroupAddMembersInput(props) {
    _classCallCheck(this, GroupAddMembersInput);

    _get(Object.getPrototypeOf(GroupAddMembersInput.prototype), 'constructor', this).call(this, props);
    this._bindFunctions('_addMember', '_removeMember', '_batchAddNewMembers');
  }

  // contacts should either be an array or null

  _createClass(GroupAddMembersInput, [{
    key: '_addMember',
    value: function _addMember() {}
  }, {
    key: '_batchAddNewMembers',
    value: function _batchAddNewMembers(users) {
      // soft adds the members to the groups and invites them to join the apps
      debugger;
    }
  }, {
    key: '_removeMember',
    value: function _removeMember() {}
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var p = this.props;
      var content = undefined;

      if (p.contacts) {
        content = _.map(p.contacts, function (contact, i) {
          return _react2['default'].createElement(
            'div',
            { key: i, className: 'member-item', onClick: _this._addMember },
            _react2['default'].createElement(
              'strong',
              null,
              contact.lastName
            ),
            ', ',
            contact.firstName
          );
        });
      } else {
        content = _react2['default'].createElement(_contactsContactInviteForm2['default'], { onInviteContacts: this._batchAddNewMembers });
      }

      return _react2['default'].createElement(
        'div',
        { className: 'group-add-member-input-wrapper' },
        _react2['default'].createElement(
          'h2',
          { className: 'add-members-title' },
          'Add Members'
        ),
        p.error && _react2['default'].createElement(
          'p',
          { className: 'error' },
          p.error
        ),
        content
      );
    }
  }]);

  return GroupAddMembersInput;
})(_sharedReactTemplate2['default']);

exports['default'] = GroupAddMembersInput;
GroupAddMembersInput.propTypes = {
  contacts: _react2['default'].PropTypes.any,
  error: _react2['default'].PropTypes.any
};
module.exports = exports['default'];