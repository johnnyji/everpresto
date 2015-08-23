import React from 'react';
import _ from 'lodash';
import ReactTemplate from '.././shared/ReactTemplate';

import TimesheetCard from './TimesheetCard';

export default class PreviousTimesheets extends ReactTemplate {
  constructor(props) {
    super(props);
  }
  render() {
    let p = this.props;

    if (p.timesheets.length === 0) {
      return (
        <div className='previous-timesheets-wrapper'>
          <h2 className='no-timesheets-header'>No Timesheets Yet.</h2>
          <p className='no-timesheets-message'>Go create one. They're free!</p>
        </div>
      );
    }

    let previousTimesheets = _.map(p.timesheets, (timesheet, i) => {
      return <TimesheetCard key={i} timesheet={timesheet} />
    });

    return (
      <div className='previous-timesheets-wrapper'>
        <div className='timesheets-container'>
          <h2>Previous Timesheets</h2>
          {previousTimesheets}
        </div>
      </div>
    );
  }
}
