import React from 'react';
import ProtectedComponent from '.././shared/ProtectedComponent';

import { RouteHandler } from 'react-router';

import DashboardNavbar from '.././app/DashboardNavbar';

class DashboardHandler extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let navLinks = [
      { path: '/dashboard', displayName: 'Groups' },
      { path: '/notes', displayName: 'Notes' },
    ];
    
    return (
      <div>
        <DashboardNavbar links={navLinks} />
        <RouteHandler />
      </div>
    );
  }
}

DashboardHandler.defaultProps = {
  currentUser: React.PropTypes.any,
  apiToken: React.PropTypes.any
};

export default ProtectedComponent(DashboardHandler);