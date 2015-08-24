import React from 'react';
import objectAssign from 'object-assign';

let Icon = React.createClass({
  propTypes: {
    icon: React.PropTypes.string.isRequired,
    size: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    style: React.PropTypes.object
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