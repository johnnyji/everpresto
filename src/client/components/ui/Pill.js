import React, {PropTypes} from 'react';
import classNames from 'classnames';

const displayName = 'ui-Pill';

const Pill = ({children, className, color, size, strike}) => {
  const classes = classNames(
    className,
    displayName,
    `${displayName}-${color}`,
    {[`${displayName}-strike`]: strike}
  );
  return (
    <span className={classes} style={{fontSize: `${size}px`}}>
      {children}
    </span>
  );
}

Pill.displayName = displayName;
Pill.propTypes = {
  color: PropTypes.oneOf(['blue', 'green', 'red', 'yellow', 'gray']).isRequired,
  className: PropTypes.string,
  size: PropTypes.number.isRequired,
  strike: PropTypes.bool.isRequired
};
Pill.defaultProps = {
  color: 'blue',
  size: 12,
  strike: false

};

export default Pill;
