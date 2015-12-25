import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Card from './Card';

const displayName = 'ui-GridViewItem';

const GridViewItem = ({children, className, isCard}) => {
  const classes = classNames(className, displayName);

  if (isCard) return <Card className={classes}>{children}</Card>;

  return <div className={classes}>{children}</div>;
};

GridViewItem.displayName = displayName;
GridViewItem.propTypes = {
  className: PropTypes.string,
  isCard: PropTypes.bool.isRequired
};
GridViewItem.defaultProps = {
  isCard: true
};

export default GridViewItem;