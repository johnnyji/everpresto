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

var _notesNoteForm = require('.././notes/NoteForm');

var _notesNoteForm2 = _interopRequireDefault(_notesNoteForm);

var _sharedFileUploader = require('.././shared/FileUploader');

var _sharedFileUploader2 = _interopRequireDefault(_sharedFileUploader);

var _sharedExitFormIcon = require('.././shared/ExitFormIcon');

var _sharedExitFormIcon2 = _interopRequireDefault(_sharedExitFormIcon);

var _sharedIcon = require('.././shared/Icon');

var _sharedIcon2 = _interopRequireDefault(_sharedIcon);

var _sharedSpinner = require('.././shared/Spinner');

var _sharedSpinner2 = _interopRequireDefault(_sharedSpinner);

var _actionsNewNoteActions = require('../.././actions/NewNoteActions');

var _actionsNewNoteActions2 = _interopRequireDefault(_actionsNewNoteActions);

var _actionsAppActions = require('../.././actions/AppActions');

var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

var _storesNewNoteStore = require('../.././stores/NewNoteStore');

var _storesNewNoteStore2 = _interopRequireDefault(_storesNewNoteStore);

var NewNoteForm = (function (_ReactTemplate) {
  _inherits(NewNoteForm, _ReactTemplate);

  function NewNoteForm(props) {
    _classCallCheck(this, NewNoteForm);

    _get(Object.getPrototypeOf(NewNoteForm.prototype), 'constructor', this).call(this, props);
    this.state = this._getInitialState();
    this._bindFunctions('_handleUpdateFileUploads', '_handleTitleChange', '_handleDescriptionChange', '_submitNote', '_exitForm', '_updateState');
  }

  _createClass(NewNoteForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._unsubscribe = _storesNewNoteStore2['default'].listen(this._updateState);
      _actionsNewNoteActions2['default'].setUserId(this.props.currentUser._id);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unsubscribe();
    }
  }, {
    key: '_getInitialState',
    value: function _getInitialState() {
      var state = _storesNewNoteStore2['default'].getState();
      return {
        note: state.note,
        errors: state.errors,
        submitting: state.submitting
      };
    }
  }, {
    key: '_updateState',
    value: function _updateState(state) {
      this.setState({
        note: state.note,
        errors: state.errors,
        submitting: state.submitting
      });
    }
  }, {
    key: '_exitForm',
    value: function _exitForm() {
      _actionsAppActions2['default'].toggleModal();
    }
  }, {
    key: '_handleTitleChange',
    value: function _handleTitleChange(title) {
      _actionsNewNoteActions2['default'].setTitle(title);
    }
  }, {
    key: '_handleDescriptionChange',
    value: function _handleDescriptionChange(description) {
      _actionsNewNoteActions2['default'].setDescription(description);
    }
  }, {
    key: '_handleUpdateFileUploads',
    value: function _handleUpdateFileUploads(files) {
      _actionsNewNoteActions2['default'].updateAttachments(files);
    }
  }, {
    key: '_submitNote',
    value: function _submitNote() {
      _actionsNewNoteActions2['default'].submitNote(this.state.note);
    }
  }, {
    key: 'render',
    value: function render() {
      var s = this.state;
      var submitButton = undefined;

      if (s.submitting) {
        submitButton = _react2['default'].createElement(_sharedSpinner2['default'], null);
      } else {
        submitButton = _react2['default'].createElement(
          'button',
          { className: 'submit-button', onClick: this._submitNote },
          'Submit'
        );
      }

      return _react2['default'].createElement(
        'div',
        { className: 'new-note-form-wrapper' },
        _react2['default'].createElement(_sharedExitFormIcon2['default'], { onExitClick: this._exitForm }),
        _react2['default'].createElement(_notesNoteForm2['default'], {
          onTitleChange: this._handleTitleChange,
          onDescriptionChange: this._handleDescriptionChange
        }),
        _react2['default'].createElement(_sharedFileUploader2['default'], {
          files: s.note.attachments,
          onUpdateFiles: this._handleUpdateFileUploads
        }),
        submitButton
      );
    }
  }]);

  return NewNoteForm;
})(_sharedReactTemplate2['default']);

exports['default'] = NewNoteForm;

NewNoteForm.propTypes = {
  currentUser: _react2['default'].PropTypes.object.isRequired
};
module.exports = exports['default'];