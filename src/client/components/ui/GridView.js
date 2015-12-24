import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'ui-GridView';

const GridView = (props) => {
  const {children, className} = props;
  const classes = classNames(className, displayName);

  return <div className={classes}>{children}</div>;
};

GridView.displayName = displayName;
GridView.propTypes = {className: PropTypes.string};

export default GridView;
