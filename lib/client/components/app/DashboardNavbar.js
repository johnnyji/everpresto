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

var _reactRouter = require('react-router');

var _sharedReactTemplate = require('.././shared/ReactTemplate');

var _sharedReactTemplate2 = _interopRequireDefault(_sharedReactTemplate);

var DashboardNavbar = (function (_ReactTemplate) {
  _inherits(DashboardNavbar, _ReactTemplate);

  function DashboardNavbar(props) {
    _classCallCheck(this, DashboardNavbar);

    _get(Object.getPrototypeOf(DashboardNavbar.prototype), 'constructor', this).call(this, props);
  }

  _createClass(DashboardNavbar, [{
    key: 'render',
    value: function render() {
      var p = this.props;
      var currentPath = this.context.router.getCurrentPathname();
      var links = _lodash2['default'].map(p.links, function (linkObject, i) {
        if (linkObject.path === currentPath) {
          return _react2['default'].createElement(
            'li',
            { key: i },
            _react2['default'].createElement(
              'a',
              { className: 'active-tab' },
              linkObject.displayName
            )
          );
        }
        return _react2['default'].createElement(
          'li',
          { key: i },
          _react2['default'].createElement(
            _reactRouter.Link,
            { to: linkObject.path, activeClassName: 'active-tab' },
            linkObject.displayName
          )
        );
      });

      return _react2['default'].createElement(
        'div',
        { className: 'dashboard-navbar-wrapper' },
        _react2['default'].createElement(
          'ul',
          null,
          links
        )
      );
    }
  }]);

  return DashboardNavbar;
})(_sharedReactTemplate2['default']);

exports['default'] = DashboardNavbar;

DashboardNavbar.propTypes = {
  // an array of objects of paths for the router to navigate to
  // [{ path: ..., displayName: ...}, {...}]
  links: _react2['default'].PropTypes.array.isRequired
};

DashboardNavbar.contextTypes = {
  router: _react2['default'].PropTypes.func
};
module.exports = exports['default'];