import React, {PropTypes, PureComponent} from 'react';
import classNames from 'classnames';
import styles from './styles/DashboardMessage.scss';

// This component positions messages along the dashboard
export default class DashboardMessage extends PureComponent {

  static displayName = 'DashboardMessage';

  static propTypes = {
    isCentered: PropTypes.bool.isRequired,
    className: PropTypes.string,
    message: PropTypes.string
  };

  static defaultProps = {
    isCentered: true
  };

  render() {
    const {children, className, isCentered, message} = this.props;

    const classes = classNames(
      {[styles.center]: isCentered},
      styles.main,
      className
    );

    return (
      <div className={classes}>
        {message && message}
        {children}
      </div>
    );
  }
}
