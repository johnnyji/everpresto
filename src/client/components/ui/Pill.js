import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'ui-Pill';

const Pill = ({children, className, color}) => {
  const classes = classNames(
    className,
    displayName,
    `${displayName}-${color}`
  );
  return (
    <span className={classes}>{children}</span>
  );
}

Pill.displayName = displayName;
Pill.propTypes = {
  color: PropTypes.oneOf(['blue', 'green', 'red', 'yellow', 'gray']).isRequired,
  className: PropTypes.string
};
Pill.defaultProps = {
  color: 'blue'
};

export default Pill;
