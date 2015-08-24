import React from 'react';
import DateHelper from '../.././utils/DateHelper';

export default class TimesheetCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { viewNote: false };
    this._toggleViewNote = this._toggleViewNote.bind(this);
  }
  _toggleViewNote() {
    this.setState({ viewNote: !this.state.viewNote });
  }
  render() {
    let p = this.props;
    let s = this.state;

    let timesheet = p.timesheet;
    let previewNote = timesheet.note && !s.viewNote;
    let viewNote = timesheet.note && s.viewNote;
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
          <p className='work-type'>
            <span className='prefix'>Job Type:</span> 
            {timesheet.workType}
          </p>
          {previewNote &&
            <p className='note' onClick={this._toggleViewNote}>
              <span className='prefix'>Message:</span>
              {`${timesheet.note.substring(0, 30)}...`}
            </p>
          }
          {viewNote &&
            <p className='note' onClick={this._toggleViewNote}>
              <span className='prefix'>Message:</span>
              {timesheet.note}
            </p> 
          }
        </div>

      </div>
    );
  }
}

TimesheetCard.propTypes = {
  timesheet: React.PropTypes.object.isRequired,
};