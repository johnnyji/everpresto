import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'DashboardContentHeader';

const DashboardContentHeader = ({children, className}) => {
  const classes = classNames(className, displayName);
  return <header className={classes}>{children}</header>
};

DashboardContentHeader.displayName = displayName;
DashboardContentHeader.propTypes = {
  className: PropTypes.string
};

export default DashboardContentHeader;