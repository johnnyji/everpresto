import React, {Component, PropTypes} from 'react';
import MUIRaisedButton from 'material-ui/RaisedButton';
import classNames from 'classnames';
import Icon from './Icon';
import pureRender from 'pure-render-decorator';

const displayName = 'ui-Button';

@pureRender
export default class Button extends Component {

  static displayName = displayName;

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
    const {
      children,
      className,
      color,
      disabled,
      icon,
      iconClassName,
      text} = this.props;
    const backgroundColors = {
      blue: '#4E9CC2',
      green: '#4DCF86',
      red: '#FF805F',
      yellow: '#FFB55F'
    }
    const classes = classNames({
      className,
      [displayName]: true
    });
    const iconClasses = classNames({
      ['ui-Button-icon']: true,
      iconClassName
    });

    return (
      <MUIRaisedButton
        backgroundColor={backgroundColors[color]}
        className={classes}
        disabled={disabled}
        onMouseUp={this._handleClick}
        icon={icon ? <Icon icon={icon} iconClass={iconClasses}/> : <span />}
        label={text}
        labelStyle={{
          color: '#FFF',
          fontSize: '16px',
          fontWeight: 400,
          textTransform: 'none'
        }}
        style={{
          borderRadius: 0
        }} />
    );
  }

  _handleClick = () => {
    if (this.props.disabled) return;
    this.props.onClick();
  }

}
