import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';
import ProtectedComponent from '.././shared/ProtectedComponent';

class EmployeesHandler extends ReactTemplate {
  render() {
    return (
      <div>List of Employees</div>
    );
  }
}

export default ProtectedComponent(EmployeesHandler);