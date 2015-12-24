import React, {PropTypes} from 'react';
import classNames from 'classnames';

const Card = ({children, className, style}) => {
  const classes = classNames(className, 'ui-Card');

  if (style) return <div className={classes} style={style}>{children}</div>;
  return <div className={classes}>{children}</div>;
}

Card.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
};

export default Card;
