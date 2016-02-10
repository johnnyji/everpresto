import React, {PropTypes} from 'react';
import classNames from 'classnames';
import FormSidebarTitle from './FormSidebarTitle';

const displayName = 'FormSidebar';

const FormSidebar = ({children, className, side, title}) => {
  const classes = classNames(
    className,
    displayName,
    `${displayName}-${side}`
  );

  return (
    <div className={classes}>
      {title && <FormSidebarTitle title={title}/>}
      {children}
    </div>
  );
}

FormSidebar.displayName = displayName;
FormSidebar.propTypes = {
  className: PropTypes.string,
  side: PropTypes.oneOf(['left', 'right']).isRequired,
  title: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.element
  ])
};
FormSidebar.defaultProps = {
  side: 'right'
};

export default FormSidebar;