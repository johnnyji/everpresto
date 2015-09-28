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

var _reactRouter = require('react-router');

var _sharedProtectedComponent = require('.././shared/ProtectedComponent');

var _sharedProtectedComponent2 = _interopRequireDefault(_sharedProtectedComponent);

var _actionsAppActions = require('../.././actions/AppActions');

var _actionsAppActions2 = _interopRequireDefault(_actionsAppActions);

var _actionsProjectActions = require('../.././actions/ProjectActions');

var _actionsProjectActions2 = _interopRequireDefault(_actionsProjectActions);

var _storesProjectStore = require('../.././stores/ProjectStore');

var _storesProjectStore2 = _interopRequireDefault(_storesProjectStore);

var _notesNotesList = require('.././notes/NotesList');

var _notesNotesList2 = _interopRequireDefault(_notesNotesList);

var _sharedIcon = require('.././shared/Icon');

var _sharedIcon2 = _interopRequireDefault(_sharedIcon);

var _sharedSearchBar = require('.././shared/SearchBar');

var _sharedSearchBar2 = _interopRequireDefault(_sharedSearchBar);

var GroupsHandler = (function (_ReactTemplate) {
  _inherits(GroupsHandler, _ReactTemplate);

  function GroupsHandler(props) {
    _classCallCheck(this, GroupsHandler);

    _get(Object.getPrototypeOf(GroupsHandler.prototype), 'constructor', this).call(this, props);
    this.state = this._getInitialState();
    this._bindFunctions('_updateState', '_changeActiveTabIndex', '_searchNotes', '_toggleNewNoteModal');
  }

  _createClass(GroupsHandler, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._unsubscribe = _storesProjectStore2['default'].listen(this._updateState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unsubscribe();
    }
  }, {
    key: '_getInitialState',
    value: function _getInitialState() {
      var state = _storesProjectStore2['default'].getState();
      return {
        projects: state.projects,
        activeTabIndex: state.activeTabIndex
      };
    }
  }, {
    key: '_updateState',
    value: function _updateState(state) {
      this.setState({
        projects: state.projects,
        activeTabIndex: state.activeTabIndex
      });
    }
  }, {
    key: '_changeActiveTabIndex',
    value: function _changeActiveTabIndex(e) {
      _actionsProjectActions2['default'].changeActiveTabIndex(e.target.value);
    }
  }, {
    key: '_searchNotes',
    value: function _searchNotes(searchTerms) {
      console.log('search hit: ', searchTerms);
    }
  }, {
    key: '_toggleNewNoteModal',
    value: function _toggleNewNoteModal(e) {
      _actionsAppActions2['default'].toggleModal('newNote');
    }
  }, {
    key: 'render',
    value: function render() {
      var s = this.state;
      var p = this.props;

      return _react2['default'].createElement(
        'div',
        { className: 'groups-wrapper' },
        _react2['default'].createElement(
          'header',
          null,
          _react2['default'].createElement(
            'div',
            { className: 'new-note' },
            _react2['default'].createElement(
              'a',
              { onClick: this._toggleNewNoteModal },
              _react2['default'].createElement(_sharedIcon2['default'], { icon: 'add' }),
              ' New Note'
            )
          ),
          _react2['default'].createElement(_sharedSearchBar2['default'], { onInputChange: this._searchNotes })
        ),
        _react2['default'].createElement(_notesNotesList2['default'], { notes: this.props.notes })
      );
    }
  }]);

  return GroupsHandler;
})(_sharedReactTemplate2['default']);

exports['default'] = (0, _sharedProtectedComponent2['default'])(GroupsHandler);
module.exports = exports['default'];