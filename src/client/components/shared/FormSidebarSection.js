import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'FormSidebarSection';

const FormSidebarSection = ({children, className}) => (
  <div className={classNames(className, displayName)}>
    {children}
  </div>
);

FormSidebarSection.displayName = 'FormSidebarSection';
FormSidebarSection.propTypes = {
  className: PropTypes.string
};

export default FormSidebarSection;