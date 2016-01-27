import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'DashboardMessage';

const DashboardMessage = ({center, children, className, message}) => {
  const classes = classNames(
    className,
    displayName,
    {[`${displayName}-content-center`]: center}
  );  
  return (
    <div className={classes}>
      <div className={`${displayName}-content`}>
        {message && message}
        {children}
      </div>
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