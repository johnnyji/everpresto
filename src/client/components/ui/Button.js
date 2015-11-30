import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Icon from './Icon';

const className = 'ui-Button';

export default class Button extends Component {

  static displayName = 'Button';

  static propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(['blue', 'red', 'green', 'yellow']).isRequired,
    disabled: PropTypes.bool.isRequired,
    iconClassName: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    textClass: PropTypes.string,
  };

  static defaultProps = {
    color: 'blue',
    disabled: false
  };

  render() {
    const classes = classNames(
      'ui-Button',
      this.props.className,
      {[`ui-Button-${this.props.color}`]: Boolean(this.props.color) && !this.props.disabled},
      {'ui-Button-disabled': this.props.disabled}
    );
    const iconClasses = classNames(
      'ui-Button-icon',
      this.props.iconClassName
    );

    return (
        <div
          className={classes}
          onClick={this._handleClick}>
          {this.props.icon && <Icon icon={this.props.icon} iconClass={iconClasses}></Icon>}
          {this.props.text && this.props.text}
          {/* This is so the users have the option of also nexting components inside
              the button, such as a `Spinner` */}
          {this.props.children}
        </div>
    );
  }

  _handleClick = () => {
    if (this.props.disabled) true;
    this.props.onClick();
  }

}