import React, {Component, PropTypes} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {Link} from 'react-router';

import AuthActions from '../.././actions/AuthActions';
import AuthStore from '../.././stores/AuthStore';

import Logo from '.././shared/Logo';
import DropdownOptions from '.././ui/DropdownOptions';


export default class DashboardHeader extends Component {

  // Allows for this.context.____ to assume the role of the React Router
  static contextTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  static propTypes = {
    user: ImmutablePropTypes.map.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      showProfileOptions: false
    };
  }

  render() {
    // TODO: Remove this once we've ensured that the current user is always passed in.
    if (!this.props.user) return <div/>;

    let headerNavContent;
    const profileNavOptions = [
      { name: 'Profile Settings', callback: this._viewProfile },
      { name: 'Logout', callback: this._logoutUser }
    ];

    return (
      <header className='dashboard-header'>
        <Logo
          iconOnly={false}
          logoClassName='pull-left dashboard-header-logo'
          logoIconSize='2.2rem'
          logoIconClassName='dashboard-header-logo-icon'
          onLogoClick={this._handleLogoClick} />
        <div className='pull-right dashboard-header-nav'>
          <Link to='profile'>
            <img className='dashboard-header-nav-profile-pic' src={this.props.currentUser.profilePictureUrl} />
          </Link>
          <span
            className='dashboard-header-nav-user-email'
            onMouseEnter={this._showProfileOptions}
            onMouseLeave={this._hideProfileOptions}>
            {this.props.currentUser.email}
          </span>
          <DropdownOptions
            dropdownOptionsClassName='dashboard-header-nav-profile-dropdown-options'
            onShowOptions={this._showProfileOptions}
            onHideOptions={this._hideProfileOptions}
            options={profileNavOptions}
            showDropdownOptions={this.state.showProfileOptions}/>
        </div>
      </header>
    );

  }

  _handleLogoClick = () => {
    if (this.context.location.pathname !== '/dashboard') {
      this.context.history.replaceState(null, '/dashboard');
    }
  }

  _hideProfileOptions = () => {
    this.setState({showProfileOptions: false});
  }

  _logoutUser = () => {
    this._hideProfileOptions();
    AuthActions.logoutUser();
  }

  _showProfileOptions = () => {
    this.setState({showProfileOptions: true});
  }

  _viewProfile = () => {
    this._hideProfileOptions();
    this.context.router.transitionTo('profile');
  }

}