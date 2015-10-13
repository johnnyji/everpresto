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

var _AppHeader = require('./AppHeader');

var _AppHeader2 = _interopRequireDefault(_AppHeader);

var _sharedFullScreenModal = require('.././shared/FullScreenModal');

var _sharedFullScreenModal2 = _interopRequireDefault(_sharedFullScreenModal);

var _timesheetNewTimesheetForm = require('.././timesheet/NewTimesheetForm');

var _timesheetNewTimesheetForm2 = _interopRequireDefault(_timesheetNewTimesheetForm);

var _notesNewNoteForm = require('.././notes/NewNoteForm');

var _notesNewNoteForm2 = _interopRequireDefault(_notesNewNoteForm);

var _groupsNewGroupForm = require('.././groups/NewGroupForm');

var _groupsNewGroupForm2 = _interopRequireDefault(_groupsNewGroupForm);

var _actionsAuthActions = require('../.././actions/AuthActions');

var _actionsAuthActions2 = _interopRequireDefault(_actionsAuthActions);

var _storesAuthStore = require('../.././stores/AuthStore');

var _storesAuthStore2 = _interopRequireDefault(_storesAuthStore);

var _storesAppStore = require('../.././stores/AppStore');

var _storesAppStore2 = _interopRequireDefault(_storesAppStore);

var AppHandler = (function (_React$Component) {
  _inherits(AppHandler, _React$Component);

  function AppHandler(props) {
    var _this = this;

    _classCallCheck(this, AppHandler);

    _get(Object.getPrototypeOf(AppHandler.prototype), 'constructor', this).call(this, props);

    this._getInitialState = function () {
      var authState = _storesAuthStore2['default'].getState();
      var appState = _storesAppStore2['default'].getState();
      return {
        currentUser: authState.currentUser,
        modal: appState.modal,
        workTypes: appState.workTypes
      };
    };

    this._updateAppState = function (state) {
      _this.setState({
        modal: state.modal,
        workTypes: state.workTypes
      });
    };

    this._updateAuthState = function (state) {
      _this.setState({ currentUser: state.currentUser });
    };

    this.state = this._getInitialState();
  }

  _createClass(AppHandler, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._unsubscribeAppStore = _storesAppStore2['default'].listen(this._updateAppState);
      this._unsubscribeAuthStore = _storesAuthStore2['default'].listen(this._updateAuthState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unsubscribeAppStore();
      this._unsubscribeAuthStore();
    }
  }, {
    key: 'render',
    value: function render() {
      var modal = undefined;

      // If the user is creating a new note.
      if (this.state.modal.newNote) {
        var modalContent = _react2['default'].createElement(_notesNewNoteForm2['default'], { currentUser: this.state.currentUser });
        modal = _react2['default'].createElement(_sharedFullScreenModal2['default'], { content: modalContent });
      }

      // If the user is creating a new group.
      if (this.state.modal.newGroup) {
        var modalContent = _react2['default'].createElement(_groupsNewGroupForm2['default'], { currentUser: this.state.currentUser });
        modal = _react2['default'].createElement(_sharedFullScreenModal2['default'], { content: modalContent });
      }

      return _react2['default'].createElement(
        'div',
        { className: 'page-wrapper' },
        modal,
        _react2['default'].createElement(_AppHeader2['default'], { currentUser: this.state.currentUser }),
        _react2['default'].createElement(
          'div',
          { className: 'content-container' },
          _react2['default'].createElement(_reactRouter.RouteHandler, null)
        )
      );
    }
  }]);

  return AppHandler;
})(_react2['default'].Component);

exports['default'] = AppHandler;
module.exports = exports['default'];