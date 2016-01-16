import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'FormSidebarBody';

const FormSidebarBody = ({children, className}) => (
  <div className={classNames(className, displayName)}>
    {children}
  </div>
);

FormSidebarBody.displayName = displayName;
FormSidebarBody.propTypes = {
  className: PropTypes.string
};

export default FormSidebarBody;