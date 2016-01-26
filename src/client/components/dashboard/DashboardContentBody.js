import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'DashboardContentBody';

const DashboardContentBody = ({children, className}) => (
  <div className={classNames(className, displayName)}>
    {children}
  </div>
);

DashboardContentBody.displayName = displayName;
DashboardContentBody.propTypes = {
  className: PropTypes.string
};

export default DashboardContentBody;