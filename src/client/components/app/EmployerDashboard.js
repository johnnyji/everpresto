import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import { RouteHandler } from 'react-router';

import ProtectedComponent from '.././shared/ProtectedComponent';
import DashboardNavbar from '.././app/DashboardNavbar';

class EmployerDashboard extends ReactTemplate {
  render() {
    let navLinks = [
      { path: '/dashboard', displayName: 'Projects' },
      { path: '/dashboard/employees', displayName: 'Employees' },
    ];
    
    return (
      <div>
        <DashboardNavbar links={navLinks} />
        <RouteHandler />
      </div>
    );
  }
}

export default ProtectedComponent(EmployerDashboard);