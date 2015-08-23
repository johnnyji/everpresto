import React from 'react';
import moment from 'moment';
import ReactTemplate from '.././shared/ReactTemplate';

export default class TimesheetCard extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions('_convertSecondsToHoursAndMinutes');
  }
  _convertSecondsToHoursAndMinutes(time) {
    let momentSeconds = moment.duration(time, 'seconds');
    let hours = Math.floor(momentSeconds.asHours());
    let minutes = Math.floor(momentSeconds.asMinutes()) - (hours * 60);
    return {
      hours: hours,
      minutes: minutes
    }
  }
  render() {
    let timesheet = this.props.timesheet;
    let convertedTime = this._convertSecondsToHoursAndMinutes();

    return (
      <div className='timesheet-card-wrapper'>
        <div className='time-display'>
          <span>{convertedTime.hours}</span>
          <small>Hrs</small>
          <span>{convertedTime.minutes}</span>
          <small>Mins</small>
        </div>
        <p>{timesheet.email}</p>
      </div>
    );
  }
}

TimesheetCard.propTypes = {
  timesheet: React.PropTypes.object.isRequired,
};