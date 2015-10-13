import React, {PropTypes} from 'react';
import {RouteHandler} from 'react-router';
import ProtectedComponent from '.././shared/ProtectedComponent';

import HorizontalNavbar from '.././ux/HorizontalNavbar';
import AppActions from '../.././actions/AppActions';

export default ProtectedComponent(class DashboardHandler extends React.Component {

  // Both apiToken and currentUser come from the ProtectedComponent decorator
  static propTypes = {
    apiToken: PropTypes.string,
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

  constructor (props) {
    super(props);
  }

  componentWillMount () {
    AppActions.loadInitialDashboardData();
  }

  render() {
    let navLinks = [
      { path: '/dashboard', name: 'Groups' },
      { path: '/dashboard/notes', name: 'Notes' },
      { path: '/dashboard/contacts', name: 'Contacts' },
    ];
    
    return (
      <div>
        <HorizontalNavbar navLinks={navLinks} />
        <RouteHandler />
      </div>
    );
  }

});