import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate'
import { Link } from 'react-router';

import AppActions from '../.././actions/AppActions';

import Icon from '.././shared/Icon';

export default class AppHeader extends ReactTemplate {
  constructor(props) {
    super(props);
  }
  render() {
    let p = this.props;
    let headerContent;

    if (p.currentUser) {
      headerContent = (
        <div className='pull-right'>
          <Link to='profile'>Profile</Link>
          <Link to='logout'>Sign Out</Link>
        </div>
      );
    } else {
      headerContent = (
        <div className='pull-right'>
          <Link to='login'>Login</Link>
          <Link to='join'>Join</Link>
        </div>
      );
    }
    return (
      <header className='app-header-wrapper'>
        <Link className='pull-left logo' to='/'>
          <Icon icon='access-time' size='3rem' />
          Tickit
        </Link>
        {headerContent}
      </header>
    );
  }
}

AppHeader.propTypes = {
  currentUser: React.PropTypes.any
};