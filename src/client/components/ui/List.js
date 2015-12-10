import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'List';

export default class List extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const {className, children} = this.props;
    const classes = classNames(className, displayName);

    return (
      <ul className={classes}>
        {children}
      </ul>
    );
  }

}
