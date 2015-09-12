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

var _projectsEmployerProjectsList = require('./projects/EmployerProjectsList');

var _projectsEmployerProjectsList2 = _interopRequireDefault(_projectsEmployerProjectsList);

var _sharedIcon = require('.././shared/Icon');

var _sharedIcon2 = _interopRequireDefault(_sharedIcon);

var ProjectsHandler = (function (_ReactTemplate) {
  _inherits(ProjectsHandler, _ReactTemplate);

  function ProjectsHandler(props) {
    _classCallCheck(this, ProjectsHandler);

    _get(Object.getPrototypeOf(ProjectsHandler.prototype), 'constructor', this).call(this, props);
    this.state = this._getInitialState();
    this._bindFunctions('_updateState', '_changeActiveTabIndex', '_showNewProjectModal');
  }

  _createClass(ProjectsHandler, [{
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
    key: '_showNewProjectModal',
    value: function _showNewProjectModal() {
      _actionsAppActions2['default'].toggleModal('newProject');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var s = this.state;
      var p = this.props;
      var navTabs = _lodash2['default'].map(p.navTabs, function (tab, i) {
        if (i === s.activeTabIndex) return _react2['default'].createElement(
          'li',
          { key: i, className: 'active-tab' },
          tab
        );
        return _react2['default'].createElement(
          'li',
          { key: i, value: i, onClick: _this._changeActiveTabIndex },
          tab
        );
      });
      var content = [_react2['default'].createElement(_projectsEmployerProjectsList2['default'], { projects: this.state.projects.archived }), _react2['default'].createElement(_projectsEmployerProjectsList2['default'], { archive: true, projects: this.state.projects.archived })];

      return _react2['default'].createElement(
        'div',
        { className: 'projects-wrapper' },
        _react2['default'].createElement(
          'header',
          null,
          _react2['default'].createElement(
            'div',
            { className: 'new-project' },
            _react2['default'].createElement(
              'button',
              { onClick: this._showNewProjectModal },
              _react2['default'].createElement(_sharedIcon2['default'], { icon: 'add' }),
              ' New Project'
            )
          ),
          _react2['default'].createElement(
            'ul',
            { className: 'sub-nav' },
            navTabs
          )
        ),
        content[s.activeTabIndex]
      );
    }
  }]);

  return ProjectsHandler;
})(_sharedReactTemplate2['default']);

ProjectsHandler.defaultProps = {
  navTabs: ['Active', 'Archived']
};

exports['default'] = (0, _sharedProtectedComponent2['default'])(ProjectsHandler);
module.exports = exports['default'];