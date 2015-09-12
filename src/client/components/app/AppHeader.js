import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate'
import { Link } from 'react-router';

import AuthActions from '../.././actions/AuthActions';
import AuthStore from '../.././stores/AuthStore';

import Icon from '.././shared/Icon';

export default class AppHeader extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions(
      '_logoutUser',
      '_toggleProfileOptions'
    );
  }
  _toggleProfileOptions() {

  }
  _logoutUser() {
    AuthActions.logoutUser();
  }
  render() {
    let p = this.props;
    let headerContent;

    if (p.currentUser) {
      return (
        <header className='app-header-wrapper'>
          <Link className='pull-left logo' to='/dashboard'>
            <Icon icon='access-time' size='3rem' />
            Tickit
          </Link>
          <div className='pull-right'>
            <Link to='profile'>
              <img src={p.currentUser.profilePictureUrl} />
            </Link>
            <span
              className='user-email' 
              onMouseEnter={this._toggleProfileOptions}
              onMouseLeave={this._toggleProfileOptions}>
              {p.currentUser.email}
            </span>
          </div>
        </header>
      );
    } else {
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
}

AppHeader.propTypes = {
  currentUser: React.PropTypes.any
};