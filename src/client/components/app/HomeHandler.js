import React from 'react';
import { Link } from 'react-router';

import AppStore from '../.././stores/AppStore';

export default class HomeHandler extends React.Component {
  componentWillMount() {
    if (this.props.currentUser) {
      return this.context.router.replaceWith('timesheets');
    }
    if (localStorage.jwt) {
      // AppActions.fetchCurrentUser(localStorage.jwt);
    }
  }
  render() {
    return (
      <div>
        <h1>Tickit</h1>
        <p>Track and manage time, the better way.</p>
        <Link to='join'>Try for free!</Link>
      </div>
    );
  }
}

HomeHandler.defaultProps = {
  currentUser: AppStore.getCurrentUser()
};

HomeHandler.contextTypes = {
  router: React.PropTypes.func
};