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
          <div className='timesheets-container'>
            <h2>{p.dateBeingViewed}</h2>
            <div className='no-timesheets-container'>
              <h3>No Timesheets Yet.</h3>
              <p>Go create one. They're free!</p>
            </div>
          </div>
        </div>
      );
    }

    let previousTimesheets = _.map(p.timesheets, (timesheet, i) => {
      return <TimesheetCard key={i} timesheet={timesheet} />
    });

    return (
      <div className='previous-timesheets-wrapper'>
        <div className='timesheets-container'>
          <h2>{p.dateBeingViewed}</h2>
          {previousTimesheets}
        </div>
      </div>
    );
  }
}

PreviousTimesheets.propTypes = {
  dateBeingViewed: React.PropTypes.string.isRequired
};