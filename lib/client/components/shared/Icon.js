'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var Icon = _react2['default'].createClass({
  displayName: 'Icon',

  propTypes: {
    icon: _react2['default'].PropTypes.string.isRequired,
    size: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
    style: _react2['default'].PropTypes.object,
    iconClass: _react2['default'].PropTypes.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      size: 24
    };
  },
  _mergeStyles: function _mergeStyles() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // This is them function from "CSS in JS" and can be extracted to a mixin
    return _objectAssign2['default'].apply(undefined, [{}].concat(args));
  },
  renderGraphic: function renderGraphic() {
    switch (this.props.icon) {
      case 'chevron-right':
        return _react2['default'].createElement(
          'g',
          null,
          _react2['default'].createElement('path', { d: 'M10 6l-1.41 1.41 4.58 4.59-4.58 4.59 1.41 1.41 6-6z' })
        );
      case 'notifications':
        return _react2['default'].createElement(
          'g',
          null,
          _react2['default'].createElement('path', { d: 'M11.5 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6.5-6v-5.5c0-3.07-2.13-5.64-5-6.32v-.68c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68c-2.87.68-5 3.25-5 6.32v5.5l-2 2v1h17v-1l-2-2z' })
        );
      case 'group-add':
        return _react2['default'].createElement(
          'g',
          null,
          _react2['default'].createElement('path', { d: 'M8 10h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2zm10 1c1.66 0 2.99-1.34 2.99-3s-1.33-3-2.99-3c-.32 0-.63.05-.91.14.57.81.9 1.79.9 2.86s-.34 2.04-.9 2.86c.28.09.59.14.91.14zm-5 0c1.66 0 2.99-1.34 2.99-3s-1.33-3-2.99-3c-1.66 0-3 1.34-3 3s1.34 3 3 3zm6.62 2.16c.83.73 1.38 1.66 1.38 2.84v2h3v-2c0-1.54-2.37-2.49-4.38-2.84zm-6.62-.16c-2 0-6 1-6 3v2h12v-2c0-2-4-3-6-3z' })
        );
      case 'search':
        return _react2['default'].createElement(
          'g',
          null,
          _react2['default'].createElement('path', { d: 'M15.5 14h-.79l-.28-.27c.98-1.14 1.57-2.62 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5 2.91 6.5 6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99 1.49-1.49-4.99-5zm-6 0c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z' })
        );
      case 'close':
        return _react2['default'].createElement(
          'g',
          null,
          _react2['default'].createElement('path', { d: 'M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z' })
        );
      case 'create':
        return _react2['default'].createElement(
          'g',
          null,
          _react2['default'].createElement('path', { d: 'M3 17.25v3.75h3.75l11.06-11.06-3.75-3.75-11.06 11.06zm17.71-10.21c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' })
        );
      case 'done':
        return _react2['default'].createElement(
          'g',
          null,
          _react2['default'].createElement('path', { d: 'M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z' })
        );
      case 'access-time':
        return _react2['default'].createElement(
          'g',
          null,
          _react2['default'].createElement('path', { fillOpacity: '.9', d: 'M11.99 2c-5.52 0-9.99 4.48-9.99 10s4.47 10 9.99 10c5.53 0 10.01-4.48 10.01-10s-4.48-10-10.01-10zm.01 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' }),
          _react2['default'].createElement('path', { fillOpacity: '.9', d: 'M12.5 7h-1.5v6l5.25 3.15.75-1.23-4.5-2.67z' })
        );
      case 'chevron-left':
        return _react2['default'].createElement(
          'g',
          null,
          _react2['default'].createElement('path', { d: 'M15.41 7.41l-1.41-1.41-6 6 6 6 1.41-1.41-4.58-4.59z' })
        );
      case 'chevron-right':
        return _react2['default'].createElement(
          'g',
          null,
          _react2['default'].createElement('path', { d: 'M10 6l-1.41 1.41 4.58 4.59-4.58 4.59 1.41 1.41 6-6z' })
        );
      case 'today':
        return _react2['default'].createElement(
          'g',
          null,
          _react2['default'].createElement('path', { d: 'M19 3h-1v-2h-2v2h-8v-2h-2v2h-1c-1.11 0-1.99.9-1.99 2l-.01 14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm0 16h-14v-11h14v11zm-12-9h5v5h-5z' })
        );
      case 'add':
        return _react2['default'].createElement(
          'g',
          null,
          _react2['default'].createElement('path', { d: 'M19 13h-6v6h-2v-6h-6v-2h6v-6h2v6h6v2z' })
        );
    }
  },
  render: function render() {
    var styles = {
      fill: "currentcolor",
      verticalAlign: "middle",
      width: this.props.size, // CSS instead of the width attr to support non-pixel units
      height: this.props.size // Prevents scaling issue in IE
    };
    return _react2['default'].createElement(
      'svg',
      {
        className: this.props.iconClass,
        viewBox: '0 0 24 24',
        preserveAspectRatio: 'xMidYMid meet',
        fit: true,
        style: this._mergeStyles(styles, this.props.style // This lets the parent pass custom styles
        ) },
      this.renderGraphic()
    );
  }
});

exports['default'] = Icon;
module.exports = exports['default'];