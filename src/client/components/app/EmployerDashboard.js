import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import { RouteHandler } from 'react-router';

import ProtectedComponent from '.././shared/ProtectedComponent';
import DashboardNavbar from '.././app/DashboardNavbar';

import ProjectActions from '../.././actions/ProjectActions';

class EmployerDashboard extends ReactTemplate {
  componentDidMount() {
    // loads whatever is needed for the employer when their dashboard mounts
    ProjectActions.loadProjects();
  }
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