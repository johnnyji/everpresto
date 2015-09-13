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

var _sharedReactTemplate = require('../.././shared/ReactTemplate');

var _sharedReactTemplate2 = _interopRequireDefault(_sharedReactTemplate);

var _actionsAppActions = require('../../.././actions/AppActions');

var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

var _actionsNewProjectActions = require('../../.././actions/NewProjectActions');

var _actionsNewProjectActions2 = _interopRequireDefault(_actionsNewProjectActions);

var _storesNewProjectStore = require('../../.././stores/NewProjectStore');

var _storesNewProjectStore2 = _interopRequireDefault(_storesNewProjectStore);

var _sharedInputField = require('../.././shared/InputField');

var _sharedInputField2 = _interopRequireDefault(_sharedInputField);

var _sharedTextField = require('../.././shared/TextField');

var _sharedTextField2 = _interopRequireDefault(_sharedTextField);

var _sharedContentEditable = require('../.././shared/ContentEditable');

var _sharedContentEditable2 = _interopRequireDefault(_sharedContentEditable);

var _sharedExitFormIcon = require('../.././shared/ExitFormIcon');

var _sharedExitFormIcon2 = _interopRequireDefault(_sharedExitFormIcon);

var NewProjectForm = (function (_ReactTemplate) {
  _inherits(NewProjectForm, _ReactTemplate);

  function NewProjectForm(props) {
    _classCallCheck(this, NewProjectForm);

    _get(Object.getPrototypeOf(NewProjectForm.prototype), 'constructor', this).call(this, props);
    this.state = this._getInitialState();
    this._bindFunctions('_updateState', '_exitForm', '_setTitle');
  }

  _createClass(NewProjectForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._unsubscribe = _storesNewProjectStore2['default'].listen(this._updateState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unsubscribe();
    }
  }, {
    key: '_getInitialState',
    value: function _getInitialState() {
      var state = _storesNewProjectStore2['default'].getState();
      return {
        project: state.project,
        errors: state.errors
      };
    }
  }, {
    key: '_updateState',
    value: function _updateState(state) {
      this.setState({
        project: state.project,
        errors: state.errors
      });
    }
  }, {
    key: '_setTitle',
    value: function _setTitle(title) {
      _actionsNewProjectActions2['default'].setTitle(title);
    }
  }, {
    key: '_setDescription',
    value: function _setDescription(description) {
      _actionsNewProjectActions2['default'].setDescription(description);
    }
  }, {
    key: '_exitForm',
    value: function _exitForm() {
      _actionsAppActions2['default'].toggleModal();
    }
  }, {
    key: 'render',
    value: function render() {
      var s = this.state;

      return _react2['default'].createElement(
        'div',
        { className: 'new-project-form-wrapper' },
        _react2['default'].createElement(_sharedExitFormIcon2['default'], { onExitClick: this._exitForm }),
        _react2['default'].createElement(_sharedContentEditable2['default'], {
          className: 'title-input',
          html: s.project.title || 'New Project',
          onChange: this._setTitle
        }),
        _react2['default'].createElement(
          'div',
          { className: 'left-content' },
          _react2['default'].createElement(_sharedTextField2['default'], {
            label: 'Description',
            onInputChange: this._setDescription
          })
        )
      );
    }
  }]);

  return NewProjectForm;
})(_sharedReactTemplate2['default']);

exports['default'] = NewProjectForm;
module.exports = exports['default'];