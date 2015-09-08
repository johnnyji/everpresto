import React from 'react';
import ProtectedComponent from '.././shared/ProtectedComponent';

import EmployeeDashboard from './EmployeeDashboard';
import EmployerDashboard from './EmployerDashboard';

class DashboardHandler extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let p = this.props;
    
    if (p.currentUser.isEmployee) {
      return <EmployeeDashboard currentUser={p.currentUser} />;
    } else if (p.currentUser.isEmployer) {
      return <EmployerDashboard currentUser={p.currentUser} />;
    }
  }
}

DashboardHandler.defaultProps = {
  currentUser: React.PropTypes.any,
  apiToken: React.PropTypes.any
};

export default ProtectedComponent(DashboardHandler);