import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'List';

const List = (props) => {
  const {className, children} = props;
  const classes = classNames(className, displayName);

  return <ul className={classes}>{children}</ul>;
}

List.displayName = displayName;
List.propTypes = {
 className: PropTypes.string
};

export default List;