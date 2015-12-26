import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'ui-FolderCard';

const FolderCard = ({className, children, height, width}) => {
  const classes = classNames(className, `${displayName}-main`);
  const styles = {height, width};

  return (
    <div className={displayName} style={styles}>
      <div className={`${displayName}-tab`}>
        <div className={`${displayName}-tab-left`}/>
        <div className={`${displayName}-tab-right`}/>
      </div>
      <div className={classes}>
        {children}
      </div>
    </div>
  );
};

FolderCard.displayName = displayName;
FolderCard.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};

export default FolderCard;