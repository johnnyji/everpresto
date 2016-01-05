import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Card from './Card';

const displayName = 'ui-GridViewItem';

const GridViewItem = ({children, className, isCard, style}) => {
  const classes = classNames(className, displayName);

  if (isCard) {
    if (style) return <Card className={classes} style={style}>{children}</Card>;
    return <Card className={classes}>{children}</Card>;
  }

  return <div className={classes}>{children}</div>;
};

GridViewItem.displayName = displayName;
GridViewItem.propTypes = {
  className: PropTypes.string,
  isCard: PropTypes.bool.isRequired,
  style: PropTypes.object
};
GridViewItem.defaultProps = {
  isCard: true
};

export default GridViewItem;