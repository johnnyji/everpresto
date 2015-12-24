import React from 'react';
import classNames from 'classnames';

const GridView = (props) => {
  const {children, className} = props;
  const classes = classNames(className, 'ui-GridView');

  return <div className={classes}>{children}</div>;
};

export default GridView;
