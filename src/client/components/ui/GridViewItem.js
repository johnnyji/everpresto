import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'ui-GridViewItem';

const GridViewItem = (props) => {
  const {children, className} = props;
  const classes = classNames(className, displayName);

  return <div className={classes}>{children}</div>;
};

GridViewItem.displayName = displayName;
GridViewItem.propTypes = {className: PropTypes.string};

export default GridViewItem;