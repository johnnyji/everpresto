import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'DashboardMessage';

const DashboardMessage = ({center, children, className, message}) => {
  const classes = classNames(
    className,
    displayName,
    {[`${displayName}-center`]: center}
  );

  return (
    <div className={classes}>
      {message && message}
      {children}
    </div>
  );
};

DashboardMessage.displayName = displayName;
DashboardMessage.propTypes = {
  center: PropTypes.bool.isRequired,
  className: PropTypes.string,
  message: PropTypes.string
};
DashboardMessage.defaultProps = {
  center: true
};

export default DashboardMessage;
