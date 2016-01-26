import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'DashboardContentHeader';

const DashboardContentHeader = ({children, className}) => (
  <header className={classNames(className, displayName)}>
    {children}
  </header>
);

DashboardContentHeader.displayName = displayName;
DashboardContentHeader.propTypes = {
  className: PropTypes.string
};

export default DashboardContentHeader;