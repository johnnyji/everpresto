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

var _sharedInputField = require('.././shared/InputField');

var _sharedInputField2 = _interopRequireDefault(_sharedInputField);

var _sharedIcon = require('.././shared/Icon');

var _sharedIcon2 = _interopRequireDefault(_sharedIcon);

var _actionsNewGroupActions = require('../.././actions/NewGroupActions');

var _actionsNewGroupActions2 = _interopRequireDefault(_actionsNewGroupActions);

var GroupNameInput = (function (_ReactTemplate) {
  _inherits(GroupNameInput, _ReactTemplate);

  function GroupNameInput(props) {
    _classCallCheck(this, GroupNameInput);

    _get(Object.getPrototypeOf(GroupNameInput.prototype), 'constructor', this).call(this, props);
    this._bindFunctions('_setGroupName');
  }

  _createClass(GroupNameInput, [{
    key: '_setGroupName',
    value: function _setGroupName() {
      var name = _react2['default'].findDOMNode(this.refs.name.refs.input).value;
      _actionsNewGroupActions2['default'].setGroupName(name);
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;

      return _react2['default'].createElement(
        'div',
        { className: 'group-name-input-wrapper' },
        _react2['default'].createElement(_sharedInputField2['default'], {
          type: 'text',
          ref: 'name',
          label: 'Select a name for your group!',
          error: p.error,
          inputPlaceholder: '(i.e. Engineering Team)'
        }),
        _react2['default'].createElement(
          'button',
          { onClick: this._setGroupName },
          'Next ',
          _react2['default'].createElement(_sharedIcon2['default'], { icon: 'chevron-right' })
        )
      );
    }
  }]);

  return GroupNameInput;
})(_sharedReactTemplate2['default']);

exports['default'] = GroupNameInput;
module.exports = exports['default'];