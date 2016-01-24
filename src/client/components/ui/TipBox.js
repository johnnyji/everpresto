import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Icon from './Icon';

const displayName = 'ui-TipBox';

const TipBox = ({align, color, className, children, headerAlign, iconSize, title}) => {
  const classes = classNames(
    className,
    displayName,
    `${displayName}-${color}`,
    `${displayName}-${align}`);
  const headerClasses = classNames(
    `${displayName}-header`,
    `${displayName}-header-${headerAlign}`);

  return (
    <div className={classes}>
      <header className={headerClasses}>
        <Icon icon='info' iconClass={`${displayName}-header-icon`} size={iconSize}/>
        {title && <span className={`${displayName}-header-title`}>{title}</span>}
      </header>
      <div className={`${displayName}-body`}>
        {children}
      </div>
    </div>
  );
};

TipBox.displayName = displayName;
TipBox.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
  color: PropTypes.oneOf(['light', 'dark']).isRequired,
  className: PropTypes.string,
  headerAlign: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
  iconSize: PropTypes.number.isRequired,
  title: PropTypes.string
};
TipBox.defaultProps = {
  align: 'left',
  color: 'light',
  headerAlign: 'center',
  iconSize: 24
};

export default TipBox;