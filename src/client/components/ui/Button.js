import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Icon from './Icon';

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
    const {children, className, color, disabled, icon, iconClassName, text} = this.props;

    const classes = classNames(
      'ui-Button',
      className,
      {[`ui-Button-${color}`]: Boolean(color) && !disabled},
      {'ui-Button-disabled': disabled}
    );
    const iconClasses = classNames('ui-Button-icon', iconClassName);

    return (
      <div
        className={classes}
        onClick={this._handleClick}>
        {icon && <Icon icon={icon} iconClass={iconClasses}></Icon>}
        {text && text}
        {/* This is so the users have the option of also nexting components inside
            the button, such as a `Spinner` */}
        {children}
      </div>
    );
  }

  _handleClick = () => {
    if (this.props.disabled) return;
    this.props.onClick();
  }

}