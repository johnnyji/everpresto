import React, {PropTypes} from 'react';
import classNames from 'classnames';
import FormSidebarTitle from './FormSidebarTitle';

const displayName = 'FormSidebar';

const FormSidebar = ({children, className, title}) => {
  return (
    <div className={classNames(className, displayName)}>
      {title && <FormSidebarTitle title={title}/>}
      {children}
    </div>
  );
}

FormSidebar.displayName = displayName;
FormSidebar.propTypes = {
  className: PropTypes.string,
  title: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.element
  ])
};

export default FormSidebar;