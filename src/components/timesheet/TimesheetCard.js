import React from 'react';
import DateHelper from '../.././utils/DateHelper';

export default class TimesheetCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let timesheet = this.props.timesheet;
    let convertedTime = DateHelper.convertSecondsToHoursAndMinutes(timesheet.timeInSeconds);

    return (
      <div className='timesheet-card-wrapper'>

        <div className='left'>

          <div className='time-display'>
            <span>{convertedTime.hours}</span>
            <small>Hrs</small>
            <span>{convertedTime.minutes}</span>
            <small>Mins</small>
          </div>
        </div>

        <div className='right'>
          <p className='employee-name'><strong>{timesheet.email}</strong></p>
          <p className='work-type'>Task: {timesheet.workType}</p>
        </div>

      </div>
    );
  }
}

TimesheetCard.propTypes = {
  timesheet: React.PropTypes.object.isRequired,
};