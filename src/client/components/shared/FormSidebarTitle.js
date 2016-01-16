import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'FormSidebarTitle';

const FormSidebarTitle = ({className, title}) => (
  <header className={classNames(className, displayName)}>
    {title}
  </header>
);

FormSidebarTitle.displayName = displayName;
FormSidebarTitle.propTypes = {
  className: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ])
};

export default FormSidebarTitle;