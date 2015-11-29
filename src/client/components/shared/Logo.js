import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Icon from './Icon';

const displayName = 'Logo';

export default class Logo extends Component {

  static displayName = displayName;

  static propTypes = {
    iconOnly: PropTypes.bool.isRequired,
    logoClassName: PropTypes.string,
    logoIconClassName: PropTypes.string,
    logoIconSize: PropTypes.string.isRequired,
    logoTextClassName: PropTypes.string,
    onLogoClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    iconOnly: true,
    logoIconSize: '30px',
    onLogoClick: () => {}
  };

  _handleClick = () => {
    this.props.onLogoClick();
  }

  render () {
    const logoClassName = classNames(displayName, this.props.logoClassName);
    const logoIconClassName = classNames(`${displayName}-icon`, this.props.logoIconClassName);
    const logoTextClassName = classNames(`${displayName}-text`, this.props.logoTextClassName);

    if (this.props.iconOnly) {
      return <Icon icon='access-time' size={this.props.logoIconSize} iconClass={logoIconClassName} />
    }

    return (
      <div className={logoClassName} onClick={this._handleClick}>
        <Icon icon='access-time' size={this.props.logoIconSize} iconClass={logoIconClassName} />
        <span className={logoTextClassName}>Tickit</span>
      </div>
    );
  }

}