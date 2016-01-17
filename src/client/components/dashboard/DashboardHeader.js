import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import CustomPropTypes from '.././CustomPropTypes';

import Logo from '.././shared/Logo';
import DropdownOptions from '.././ui/DropdownOptions';
import Tab from '.././ui/Tab';

const displayName = 'DashboardHeader';

export default class DashboardHeader extends Component {

  static displayName = displayName;

  // Allows for this.context.____ to assume the role of the React Router
  static contextTypes = {
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    currentUser: CustomPropTypes.user.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      showProfileOptions: false
    };
  }

  render() {
    const {currentUser} = this.props;
    const firstName = currentUser.getIn(['account', 'firstName']);
    const lastName = currentUser.getIn(['account', 'lastName']);
    const profilePictureUrl = currentUser.getIn(['account', 'profilePictureUrl']);
    const profileNavOptions = [
      {label: 'Profile Settings', callback: this._viewProfile},
      {label: 'Logout', callback: this._logoutUser}
    ];

    return (
      <header className={displayName}>

        <nav className={`${displayName}-navbar`}>
          <Logo
            logoIconClassName={`${displayName}-navbar-logo`}
            logoIconSize='2.2rem'
            onLogoClick={this._handleLogoClick} />

          <div className={`${displayName}-navbar-nav`}>
            <Link to='profile'>
              <img
                className={`${displayName}-navbar-nav-profile-pic`}
                src={profilePictureUrl} />
            </Link>
            <span
              className={`${displayName}-navbar-nav-profile-name`}
              onMouseEnter={this._showProfileOptions}
              onMouseLeave={this._hideProfileOptions}>
              {`${firstName} ${lastName}`}
            </span>
            <DropdownOptions
              className={`${displayName}-navbar-nav-profile-dropdown`}
              onHideDropdown={this._hideProfileOptions}
              options={profileNavOptions}
              showDropdownOptions={this.state.showProfileOptions}/>
          </div>
        </nav>

      </header>
    );

  }

  _handleLogoClick = () => {
    const {location, history} = this.context;
    if (location.pathname !== '/dashboard') history.push('/dashboard');
  }

  _hideProfileOptions = () => {
    this.setState({showProfileOptions: false});
  }

  _logoutUser = () => {
    this._hideProfileOptions();
  }

  _showProfileOptions = () => {
    this.setState({showProfileOptions: true});
  }

  _viewProfile = () => {
    this._hideProfileOptions();
    this.context.router.push('/profile');
  }

}