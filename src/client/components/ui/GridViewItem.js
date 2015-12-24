import React from 'react';
import classNames from 'classnames';

const displayName = 'ui-GridViewItem';

const GridViewItem = (props) => {
  const {children, className} = props;
  const classes = classNames('ui-GridViewItem', className);

  return <div className={classes}>{children}</div>;
};

export default GridViewItem;