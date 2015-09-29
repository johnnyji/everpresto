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

var _sharedProtectedComponent = require('.././shared/ProtectedComponent');

var _sharedProtectedComponent2 = _interopRequireDefault(_sharedProtectedComponent);

var _GroupsController = require('./GroupsController');

var _GroupsController2 = _interopRequireDefault(_GroupsController);

var _ActiveGroupContent = require('./ActiveGroupContent');

var _ActiveGroupContent2 = _interopRequireDefault(_ActiveGroupContent);

var _chatChatWindow = require('.././chat/ChatWindow');

var _chatChatWindow2 = _interopRequireDefault(_chatChatWindow);

var GroupsHandler = (function (_ReactTemplate) {
  _inherits(GroupsHandler, _ReactTemplate);

  function GroupsHandler(props) {
    _classCallCheck(this, GroupsHandler);

    _get(Object.getPrototypeOf(GroupsHandler.prototype), 'constructor', this).call(this, props);
  }

  // current user is passed from ProtectedComponent decorator

  _createClass(GroupsHandler, [{
    key: 'render',
    value: function render() {
      var s = this.state;
      var p = this.props;

      return _react2['default'].createElement(
        'div',
        { className: 'groups-handler-wrapper' },
        _react2['default'].createElement(_GroupsController2['default'], { groups: null }),
        _react2['default'].createElement(_ActiveGroupContent2['default'], { group: null, notes: [] }),
        _react2['default'].createElement(_chatChatWindow2['default'], null)
      );
    }
  }]);

  return GroupsHandler;
})(_sharedReactTemplate2['default']);

GroupsHandler.propTypes = {
  currentUser: _react2['default'].PropTypes.object.isRequired
};

exports['default'] = (0, _sharedProtectedComponent2['default'])(GroupsHandler);
module.exports = exports['default'];