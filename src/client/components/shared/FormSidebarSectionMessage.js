import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'FormSidebarSectionMessage';

const FormSidebarSectionMessage = ({children, className}) => (
  <h3 className={classNames(className, displayName)}>{children}</h3>
);

FormSidebarSectionMessage.displayName = displayName;
FormSidebarSectionMessage.propTypes = {
  className: PropTypes.string
};

export default FormSidebarSectionMessage;