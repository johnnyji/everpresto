import React from 'react';
import objectAssign from 'object-assign';

let Icon = React.createClass({
  propTypes: {
    icon: React.PropTypes.string.isRequired,
    size: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    style: React.PropTypes.object,
    iconClass: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      size: 24
    };
  },
  _mergeStyles(...args) {
    // This is them function from "CSS in JS" and can be extracted to a mixin
    return objectAssign({}, ...args);
  },
  renderGraphic() {
    switch (this.props.icon) {
      case 'create':
        return (
          <g><path d="M3 17.25v3.75h3.75l11.06-11.06-3.75-3.75-11.06 11.06zm17.71-10.21c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>
      );
      case 'done':
        return (
          <g><path d="M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z"></path></g>
        );
      case 'access-time':
        return (
          <g><path fillOpacity=".9" d="M11.99 2c-5.52 0-9.99 4.48-9.99 10s4.47 10 9.99 10c5.53 0 10.01-4.48 10.01-10s-4.48-10-10.01-10zm.01 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path><path fillOpacity=".9" d="M12.5 7h-1.5v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>
        );
      case 'chevron-left':
        return (
          <g><path d="M15.41 7.41l-1.41-1.41-6 6 6 6 1.41-1.41-4.58-4.59z"></path></g>
        );
      case 'chevron-right':
        return (
          <g><path d="M10 6l-1.41 1.41 4.58 4.59-4.58 4.59 1.41 1.41 6-6z"></path></g>
        );
      case 'today':
        return (
          <g><path d="M19 3h-1v-2h-2v2h-8v-2h-2v2h-1c-1.11 0-1.99.9-1.99 2l-.01 14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm0 16h-14v-11h14v11zm-12-9h5v5h-5z"></path></g>
        );
    }
  },
  render() {
    let styles = {
      fill: "currentcolor",
      verticalAlign: "middle",
      width: this.props.size, // CSS instead of the width attr to support non-pixel units
      height: this.props.size // Prevents scaling issue in IE
    };
    return (
      <svg
        className={this.props.iconClass}
        viewBox="0 0 24 24" 
        preserveAspectRatio="xMidYMid meet" 
        fit
        style={this._mergeStyles(
          styles,
          this.props.style // This lets the parent pass custom styles
        )}>
        {this.renderGraphic()}
      </svg>
    );
  }
});

export default Icon;