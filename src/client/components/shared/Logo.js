import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Icon from './Icon';

export default class Logo extends React.Component {

  static propTypes = {
    iconOnly: PropTypes.bool.isRequired,
    logoClassName: PropTypes.string,
    logoIconClassName: PropTypes.string,
    logoIconSize: PropTypes.string.isRequired,
    logoTextClassName: PropTypes.string,
    onLogoClick: PropTypes.func.isRequired
  }

  static defaultProps = {
    iconOnly: true,
    logoIconSize: '30px',
    onLogoClick: () => {}
  }

  constructor(props) {
    super(props);
  }

  _handleClick = () => {
    this.props.onLogoClick();
  }

  render () {
    const logoClassName = classNames('logo', this.props.logoClassName);
    const logoIconClassName = classNames('logo-icon', this.props.logoIconClassName);
    const logoTextClassName = classNames('logo-text', this.props.logoTextClassName);

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