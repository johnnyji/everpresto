import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Card from './Card';

const displayName = 'ui-ModalWrapper';

const ModalWrapper = ({children, className, height, unit, width}) => {
  const classes = classNames(displayName, className);
  const style = {
    height: `${height}${unit}`,
    width: `${width}${unit}`
  };

  return <Card className={classes} style={style}>{children}</Card>;
}

ModalWrapper.displayName = 'ui-ModalWrapper';
ModalWrapper.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number.isRequired,
  unit: PropTypes.oneOf(['px', 'rem', 'em', '%']).isRequired,
  width: PropTypes.number.isRequired
};
ModalWrapper.defaultProps = {
  height: 400,
  unit: 'px',
  width: 600
};

export default ModalWrapper;