import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {Link} from 'react-router';

import Logo from '.././shared/Logo';
import DropdownOptions from '.././ui/DropdownOptions';
import Tab from '.././ui/Tab';

const displayName = 'DashboardHeader';

export default class DashboardHeader extends Component {

  static displayName = displayName;

  // Allows for this.context.____ to assume the role of the React Router
  static contextTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  static propTypes = {
    currentUser: ImmutablePropTypes.contains({
      _id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      profilePictureUrl: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired
    }).isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      showProfileOptions: false
    };
  }

  render() {
    const {currentUser} = this.props;
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
                src={currentUser.get('profilePictureUrl')} />
            </Link>
            <span
              className={`${displayName}-navbar-nav-profile-name`}
              onMouseEnter={this._showProfileOptions}
              onMouseLeave={this._hideProfileOptions}>
              {`${currentUser.get('firstName')} ${currentUser.get('lastName')}`}
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
    if (this.context.location.pathname !== '/dashboard') {
      this.context.history.push('/dashboard');
    }
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
    this.context.history.push('/profile');
  }

}