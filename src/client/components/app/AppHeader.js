import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate'
import { Link } from 'react-router';

import AuthActions from '../.././actions/AuthActions';
import AuthStore from '../.././stores/AuthStore';

import Icon from '.././shared/Icon';
import DropdownOptions from '.././shared/DropdownOptions';

export default class AppHeader extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = { showProfileOptions: false };
    this._bindFunctions(
      '_showProfileOptions',
      '_hideProfileOptions',
      '_logoutUser',
      '_viewProfile'
    );
  }
  _showProfileOptions() {
    this.setState({ showProfileOptions: true });
  }
  _hideProfileOptions() {
    this.setState({ showProfileOptions: false });
  }
  _viewProfile() {
    this._hideProfileOptions();
    this.context.router.transitionTo('profile');
  }
  _logoutUser() {
    this._hideProfileOptions();
    AuthActions.logoutUser();
  }
  render() {
    let p = this.props;
    let s = this.state;
    let headerContent;

    // current user present
    if (p.currentUser) {
      let profileOptions = [
        { name: 'View Profile', action: this._viewProfile },
        { name: 'Logout', action: this._logoutUser }
      ];

      return (
        <header className='app-header-wrapper'>
          <Link className='pull-left logo' to='/dashboard'>
            <Icon icon='access-time' size='2.2rem' />
            Tickit
          </Link>
          <div className='pull-right'>
            <Link to='profile'>
              <img src={p.currentUser.profilePictureUrl} />
            </Link>
            <span
              className='user-email'
              onMouseEnter={this._showProfileOptions}
              onMouseLeave={this._hideProfileOptions}>
              {p.currentUser.email}
            </span>
          </div>
          <DropdownOptions 
            onEnter={this._showProfileOptions}
            onLeave={this._hideProfileOptions}
            showOptions={s.showProfileOptions}
            options={profileOptions}
          />
        </header>
      );
    }

    // no current user
    return (
      <header className='app-header-wrapper'>
        <Link className='pull-left logo' to='/'>
          <Icon icon='access-time' size='3rem' />
          Tickit
        </Link>
        <div className='pull-right'>
          <Link to='login'>Login</Link>
          <Link to='join'>Join</Link>
        </div>
      </header>
    );
  }
}

AppHeader.contextTypes = {
  router: React.PropTypes.func
};

AppHeader.propTypes = {
  currentUser: React.PropTypes.any
};