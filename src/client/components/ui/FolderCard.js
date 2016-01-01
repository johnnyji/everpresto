import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'ui-FolderCard';

const FolderCard = ({className, children, contentClassName, height, width}) => {
  const classes = classNames(className, displayName);
  const contentClasses = classNames(`${displayName}-main`, contentClassName);
  const styles = {height, width};

  return (
    <div className={classes} style={styles}>
      <div className={`${displayName}-tab`}>
        <div className={`${displayName}-tab-left`}/>
        <div className={`${displayName}-tab-right`}/>
      </div>
      <div className={contentClasses}>
        {children}
      </div>
    </div>
  );
};

FolderCard.displayName = displayName;
FolderCard.defaultProps = {
  height: 150,
  width: 200
};
FolderCard.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default FolderCard;