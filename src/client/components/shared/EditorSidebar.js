import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'EditorSidebar';

export default class EditorSidebar extends Component {

  static displayName = displayName;

  render() {
    const {className, children} = this.props;
    const classes = classNames(className, displayName);

    return (
      <div className={classes}>
        {children}
      </div>
    );
  }
}