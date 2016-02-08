import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'FormSidebarSectionTitle';

const FormSidebarSectionTitle = ({children, className}) => (
  <header className={classNames(className, displayName)}>
    {children}
  </header>
);

FormSidebarSectionTitle.displayName = displayName;
FormSidebarSectionTitle.propTypes = {
  className: PropTypes.string
};

export default FormSidebarSectionTitle;