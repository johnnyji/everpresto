import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Icon from './Icon';

export default class Button extends Component {

  static propTypes = {
    buttonClass: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    iconClass: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    textClass: PropTypes.string,
  };

  static defaultProps = {
    disabled: false
  };

  render() {
    const buttonClass = classNames(
      'ui-button',
      this.props.buttonClass,
      {'ui-button-disabled': this.props.disabled}
    );
    const iconClass = classNames(
      'ui-button-icon',
      this.props.iconClass
    );

    return (
        <button
          className={buttonClass}
          onClick={this._handleClick}>
          {this.props.icon && <Icon icon={this.props.icon} iconClass={iconClass}></Icon>}
          {this.props.text && this.props.text}
          {/* This is so the users have the option of also nexting components inside
              the button, such as a `Spinner` */}
          {this.props.children}
        </button>
    );
  }

  _handleClick = () => {
    this.props.onClick();
  }

}