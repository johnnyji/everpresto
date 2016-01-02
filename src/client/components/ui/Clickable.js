import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'ui-Clickable';

export default class Clickable extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired
  }

  render() {
    const {className, children, onClick} = this.props;
    const classes = classNames(className, displayName);

    return <button className={classes} onClick={onClick}>{children}</button>;
  }
}