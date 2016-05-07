import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import pureRender from 'pure-render-decorator';

const displayName = 'ui-Pill';

@pureRender
export default class Pill extends Component {
  static displayName = displayName;

  static propTypes = {
    color: PropTypes.oneOf(['blue', 'green', 'red', 'yellow', 'gray']).isRequired,
    className: PropTypes.string,
    size: PropTypes.number.isRequired,
    strike: PropTypes.bool.isRequired
  };

  static defaultProps = {
    color: 'blue',
    size: 12,
    strike: false
  };

  render() {
    const {children, className, color, size, strike} = this.props;
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
}
