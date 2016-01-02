import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'DashboardMessage';

const DashboardMessage = ({children, className, message}) => {
  const classes = classNames(className, displayName);  
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
  className: PropTypes.string,
  message: PropTypes.string
};

export default DashboardMessage;