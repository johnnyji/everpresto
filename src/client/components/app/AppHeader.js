import React from 'react';
import { Link } from 'react-router';

import Icon from '.././shared/Icon';

export default class AppHeader extends React.Component {
  render() {
    return (
      <header className='app-header-wrapper'>
        <Link className='pull-left logo' to='/'>
          <Icon icon='access-time' size='3rem' />
          Tickit
        </Link>
      </header>
    );
  }
}
