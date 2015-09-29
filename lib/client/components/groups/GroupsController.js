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

var _actionsAppActions = require('../.././actions/AppActions');

var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

var _sharedIcon = require('.././shared/Icon');

var _sharedIcon2 = _interopRequireDefault(_sharedIcon);

var _GroupsListViewItem = require('./GroupsListViewItem');

var _GroupsListViewItem2 = _interopRequireDefault(_GroupsListViewItem);

var GroupsController = (function (_ReactTemplate) {
  _inherits(GroupsController, _ReactTemplate);

  function GroupsController(props) {
    _classCallCheck(this, GroupsController);

    _get(Object.getPrototypeOf(GroupsController.prototype), 'constructor', this).call(this, props);
    this._bindFunctions('_toggleNewGroupModal');
  }

  _createClass(GroupsController, [{
    key: '_toggleNewGroupModal',
    value: function _toggleNewGroupModal() {
      _actionsAppActions2['default'].toggleModal('newGroup');
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var content = undefined;

      if (!p.groups || p.groups.length === 0) {
        content = _react2['default'].createElement(
          'div',
          { className: 'tip-box' },
          _react2['default'].createElement(
            'p',
            null,
            'Looks like you don\'t have any groups yet...'
          ),
          _react2['default'].createElement(
            'p',
            null,
            'Click the "New Group" button above to create a group and start adding you\'re teammates!'
          )
        );
      } else {
        var groups = _.map(p.groups, function (group, i) {
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
        { className: 'groups-controller-wrapper' },
        _react2['default'].createElement(
          'header',
          null,
          _react2['default'].createElement(
            'button',
            { className: 'new-group-button', onClick: this._toggleNewGroupModal },
            _react2['default'].createElement(_sharedIcon2['default'], { icon: 'group-add' }),
            ' New Group'
          )
        ),
        content
      );
    }
  }]);

  return GroupsController;
})(_sharedReactTemplate2['default']);

exports['default'] = GroupsController;

GroupsController.propTypes = {
  groups: _react2['default'].PropTypes.any
};
module.exports = exports['default'];