import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate'
import ProtectedComponent from '.././shared/ProtectedComponent';

class EmployeeDashboard extends ReactTemplate {
  render() {
    return (
      <div>
        Employee
      </div>
    );
  }
}

export default ProtectedComponent(EmployeeDashboard);