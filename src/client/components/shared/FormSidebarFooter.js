import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'FormSidebarFooter';

const FormSidebarFooter = ({children, className}) => (
  <footer className={classNames(className, displayName)}>{children}</footer>
);

FormSidebarFooter.displayName = displayName;
FormSidebarFooter.propTypes = {
  className: PropTypes.string
};

export default FormSidebarFooter;