import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'DashboardMessage';

export default class DashboardMessage extends Component {

  static displayName = displayName;

  static propTypes = {
    className: PropTypes.string,
    message: PropTypes.string
  };

  render() {
    const {children, className, message} = this.props;
    const classes = classNames(className, displayName);
    
    return (
      <div className={classes}>
        {message && message}
        {children}
      </div>
    );
  }
}
