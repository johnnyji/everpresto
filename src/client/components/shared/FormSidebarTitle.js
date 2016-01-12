import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'FormSidebarTitle';

const FormSidebarTitle = ({children, className, title}) => {
  const classes = classNames(className, displayName);
  if (children) return <header className={classes}>{children}</header>;
  return <header className={classes}>{title}</header>;
};

FormSidebarTitle.displayName = displayName;
FormSidebarTitle.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string
};

export default FormSidebarTitle;