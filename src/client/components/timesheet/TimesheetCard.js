import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';
import DateHelper from '../.././utils/DateHelper';

import Icon from '.././shared/Icon';

import TimesheetActions from '../.././actions/TimesheetActions';

export default class TimesheetCard extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = { viewNote: false, showOptions: false };
    this._bindFunctions(
      '_toggleOptions',
      '_toggleViewNote',
      '_onEditTimesheet',
      '_onDeleteTimesheet'
    );
  }
  _toggleOptions() {
    this.setState({ showOptions: !this.state.showOptions });
  }
  _toggleViewNote() {
    this.setState({ viewNote: !this.state.viewNote });
  }
  _onEditTimesheet() {

  }
  _onDeleteTimesheet() {
    TimesheetActions.deleteTimesheet(this.props.timesheet._id);
  }
  render() {
    let p = this.props;
    let s = this.state;

    let timesheet = p.timesheet;
    let previewNote = timesheet.note && !s.viewNote;
    let viewNote = timesheet.note && s.viewNote;
    let convertedTime = DateHelper.convertSecondsToHoursAndMinutes(timesheet.timeInSeconds);

    return (
      <div className='timesheet-card-wrapper' onMouseEnter={this._toggleOptions} onMouseLeave={this._toggleOptions}>

        {s.showOptions &&
          <ul className='options'>
            <li onClick={this._onEditTimesheet}><Icon icon='create' size='1.3rem'/></li>
            <li onClick={this._onDeleteTimesheet}><Icon icon='close' size='1.3rem'/></li>
          </ul>
        }

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