import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'FormSidebar';

const FormSidebar = ({children, className}) => {
  const classes = classNames(className, displayName);
  return <div className={classes}>{children}</div>;
}

FormSidebar.displayName = displayName;
FormSidebar.propTypes = {className: PropTypes.string};

export default FormSidebar;