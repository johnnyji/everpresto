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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sharedReactTemplate = require('.././shared/ReactTemplate');

var _sharedReactTemplate2 = _interopRequireDefault(_sharedReactTemplate);

var _GroupNameInput = require('./GroupNameInput');

var _GroupNameInput2 = _interopRequireDefault(_GroupNameInput);

var _GroupAddMembersInput = require('./GroupAddMembersInput');

var _GroupAddMembersInput2 = _interopRequireDefault(_GroupAddMembersInput);

var _actionsAppActions = require('../.././actions/AppActions');

var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

var _actionsNewGroupActions = require('../.././actions/NewGroupActions');

var _actionsNewGroupActions2 = _interopRequireDefault(_actionsNewGroupActions);

var _storesNewGroupStore = require('../.././stores/NewGroupStore');

var _storesNewGroupStore2 = _interopRequireDefault(_storesNewGroupStore);

var _sharedExitFormIcon = require('.././shared/ExitFormIcon');

var _sharedExitFormIcon2 = _interopRequireDefault(_sharedExitFormIcon);

var _sharedInputField = require('.././shared/InputField');

var _sharedInputField2 = _interopRequireDefault(_sharedInputField);

var NewGroupForm = (function (_ReactTemplate) {
  _inherits(NewGroupForm, _ReactTemplate);

  function NewGroupForm(props) {
    _classCallCheck(this, NewGroupForm);

    _get(Object.getPrototypeOf(NewGroupForm.prototype), 'constructor', this).call(this, props);
    this.state = this._getInitialState();
    this._bindFunctions('_exitForm', '_updateState');
  }

  _createClass(NewGroupForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._unsubscribe = _storesNewGroupStore2['default'].listen(this._updateState);
      _actionsNewGroupActions2['default'].setGroupCreator(this.props.currentUser);
    }
  }, {
    key: 'compoenentDidUnmount',
    value: function compoenentDidUnmount() {
      this._unsubscribe();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _actionsNewGroupActions2['default'].resetState();
    }
  }, {
    key: '_getInitialState',
    value: function _getInitialState() {
      var state = _storesNewGroupStore2['default'].getState();
      return {
        group: state.group,
        errors: state.errors,
        activeFormPhaseIndex: state.activeFormPhaseIndex
      };
    }
  }, {
    key: '_updateState',
    value: function _updateState(state) {
      this.setState({
        group: state.group,
        errors: state.errors,
        activeFormPhaseIndex: state.activeFormPhaseIndex
      });
    }
  }, {
    key: '_exitForm',
    value: function _exitForm() {
      _actionsAppActions2['default'].toggleModal();
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;
      var s = this.state;
      var phases = [_react2['default'].createElement(_GroupNameInput2['default'], { error: s.errors.name }), _react2['default'].createElement(_GroupAddMembersInput2['default'], { contacts: p.currentUser.contacts })];

      return _react2['default'].createElement(
        'div',
        { className: 'new-group-form-wrapper' },
        _react2['default'].createElement(_sharedExitFormIcon2['default'], { onExitClick: this._exitForm }),
        phases[s.activeFormPhaseIndex]
      );
    }
  }]);

  return NewGroupForm;
})(_sharedReactTemplate2['default']);

exports['default'] = NewGroupForm;

NewGroupForm.propTypes = {
  currentUser: _react2['default'].PropTypes.object.isRequired
};
module.exports = exports['default'];