import React from 'react';
import { Link } from 'react-router';

export default class AppHeader extends React.Component {
  render() {
    return (
      <header className='app-header-wrapper'>
        <Link className='pull-left logo' to='/'>TimeTick</Link>
      </header>
    );
  }
}
