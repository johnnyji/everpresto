import React, {PropTypes} from 'react';
import classNames from 'classnames';

import Icon from './Icon';

export default class Button extends React.Component {

  static propTypes = {
    buttonClass: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    iconClass: PropTypes.string,
    iconName: PropTypes.string,
    onButtonClick: PropTypes.func.isRequired,
    textClass: PropTypes.string,
  }

  static defaultProps = {
    disabled: false,
    onButtonClick: () => {}
  }

  _handleClick = () => {
    this.props.onButtonClick();
  }

  render() {
    const buttonClass = classNames('button', this.props.buttonClass);
    const iconClass = classNames('button-content-icon', this.props.iconClass);
    let buttonContent;

    if (this.props.iconName && this.props.text) {
      // when the button has both text and an icon
      buttonContent = (
        <div classNames='button-content'>
          <Icon icon={this.props.iconName} iconClass={iconClass}></Icon> {this.props.text}
        </div>
      );
    } else if (this.props.text) {
      // if there's only text
      buttonContent = (
        <div className='button-content'>
          {this.props.text}
        </div>
      );
    } else {
      // if there's only an icon
      buttonContent = (
        <div className='button-content'>
          <Icon icon={this.props.iconName} iconClass={iconClass}></Icon>
        </div>
      );
    }

    return (
      <button className={buttonClass} onClick={this._handleClick}>
        {buttonContent}
      </button>
    );
  }
}
