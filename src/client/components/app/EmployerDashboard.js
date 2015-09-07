import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate'
import ProtectedComponent from '.././shared/ProtectedComponent';
import DateNavbar from '.././date/DateNavbar';

import DateHelper from '../.././utils/DateHelper';

class EmployerDashboard extends ReactTemplate {
  render() {
    let weekBeingViewed = DateHelper.formatWeekDurationFromDate(Date.now());
    return (
      <div>
        <DateNavbar weekBeingViewed={weekBeingViewed} />
      </div>
    );
  }
}

export default ProtectedComponent(EmployerDashboard);