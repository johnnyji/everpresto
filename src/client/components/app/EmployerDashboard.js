import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate'
import ProtectedComponent from '.././shared/ProtectedComponent';

class EmployerDashboard extends ReactTemplate {
  render() {
    return (
      <div>Dashboard!</div>
    );
  }
}

export default ProtectedComponent(EmployerDashboard);