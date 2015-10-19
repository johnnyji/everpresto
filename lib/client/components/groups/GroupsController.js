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

var _uxButton = require('.././ux/Button');

var _uxButton2 = _interopRequireDefault(_uxButton);

var _GroupsListViewItem = require('./GroupsListViewItem');

var _GroupsListViewItem2 = _interopRequireDefault(_GroupsListViewItem);

var _uxTipBox = require('.././ux/TipBox');

var _uxTipBox2 = _interopRequireDefault(_uxTipBox);

var _actionsAppActions = require('../.././actions/AppActions');

var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

var GroupsController = (function (_React$Component) {
  _inherits(GroupsController, _React$Component);

  _createClass(GroupsController, null, [{
    key: 'propTypes',
    value: {
      groups: _react.PropTypes.object
    },
    enumerable: true
  }]);

  function GroupsController(props) {
    _classCallCheck(this, GroupsController);

    _get(Object.getPrototypeOf(GroupsController.prototype), 'constructor', this).call(this, props);

    this._toggleNewGroupModal = function () {
      _actionsAppActions2['default'].toggleModal('newGroup');
    };
  }

  _createClass(GroupsController, [{
    key: 'render',
    value: function render() {
      var noGroups = !this.props.groups || this.props.groups.length === 0;
      var content = undefined;

      if (noGroups) {
        content = _react2['default'].createElement(_uxTipBox2['default'], {
          text: _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
              'p',
              null,
              'Looks like you don\'t have any groups yet...'
            ),
            _react2['default'].createElement(
              'p',
              null,
              'Click the "New Group" button above to create a group and start adding teammates!'
            )
          ) });
      } else {
        var groups = this.props.groups.map(function (group, i) {
          return _react2['default'].createElement(GroupListViewItem, { group: group, key: i });
        });
        content = _react2['default'].createElement(
          'ul',
          null,
          groups
        );
      }

      return _react2['default'].createElement(
        'div',
        { className: 'groups-controller' },
        _react2['default'].createElement(_uxButton2['default'], {
          buttonClass: 'groups-controller-new-group-button',
          iconName: 'group-add',
          onButtonClick: this._toggleNewGroupModal,
          text: 'New Group' }),
        content
      );
    }
  }]);

  return GroupsController;
})(_react2['default'].Component);

exports['default'] = GroupsController;
module.exports = exports['default'];