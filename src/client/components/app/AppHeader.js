import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import AuthActions from '../.././actions/AuthActions';
import AuthStore from '../.././stores/AuthStore';

import Logo from '.././shared/Logo';
import DropdownOptions from '.././ux/DropdownOptions';

export default class AppHeader extends React.Component {

  // inherited from ProtectedComponent wrapper
  static propTypes = {
    currentUser: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      createdAt: PropTypes.string,
      email: PropTypes.string,
      groupPreviews: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          iconUrl: PropTypes.string.isRequired
        })
      ),
      profilePictureUrl: PropTypes.string.isRequired,
      updatedAt: PropTypes.string
    })
  }

  // Allows for this.context.router to assume the role of the React Router
  static contextTypes = {
    router: PropTypes.func
  }

  constructor (props) {
    super(props);
    this.state = { showProfileOptions: false };
  }

  _handleLogoClick = () => {
    if (this.context.router.getCurrentPath() !== '/dashboard') {
      this.context.router.transitionTo('/dashboard');
    }
  }

  _hideProfileOptions = () => {
    this.setState({ showProfileOptions: false });
  }

  _logoutUser = () => {
    this._hideProfileOptions();
    AuthActions.logoutUser();
  }

  _showProfileOptions = () => {
    this.setState({ showProfileOptions: true });
  }

  _viewProfile = () => {
    this._hideProfileOptions();
    this.context.router.transitionTo('profile');
  }

  render() {
    let headerNavContent;
    let profileNavOptions;

    // If the current user is present, we're setting the nav content to their profile picture
    // and profile options. Otherwise it will default to Login and Register buttons
    if (this.props.currentUser) {
      profileNavOptions = [
        { name: 'Profile Settings', callback: this._viewProfile },
        { name: 'Logout', callback: this._logoutUser }
      ];
      headerNavContent = (
        <div>
          <Link to='profile'>
            <img className='app-header-nav-profile-pic' src={this.props.currentUser.profilePictureUrl} />
          </Link>
          <span
            className='app-header-nav-user-email'
            onMouseEnter={this._showProfileOptions}
            onMouseLeave={this._hideProfileOptions}>
            {this.props.currentUser.email}
          </span>
          <DropdownOptions
            dropdownOptionsClassName='app-header-nav-profile-dropdown-options'
            onShowOptions={this._showProfileOptions}
            onHideOptions={this._hideProfileOptions}
            options={profileNavOptions}
            showDropdownOptions={this.state.showProfileOptions}/>
        </div>
      );
    } else {
      headerNavContent = (
        <div>
          <Link to='/login'>Login</Link>
          <Link to='/join'>Join</Link>
        </div>
      );
    }

    return (
      <header className='app-header'>
        <Logo
          iconOnly={false}
          logoClassName='pull-left app-header-logo'
          logoIconSize='2.2rem'
          logoIconClassName='app-header-logo-icon'
          onLogoClick={this._handleLogoClick} />
        <div className='pull-right app-header-nav'>
          {headerNavContent}
        </div>
      </header>
    );

  }

}