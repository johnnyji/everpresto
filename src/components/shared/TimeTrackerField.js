import React from 'react';
import ReactTemplate from './ReactTemplate'

import NewTimesheetActions from '../.././actions/NewTimesheetActions';

import InputFieldLabel from './InputFieldLabel';


export default class TimeTrackerField extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = { showTimeTrackMethodSetting: false };
    this._bindFunctions(
      '_toggleTimeTrackMethodSetting',
      '_setTrackingMethodToMins',
      '_setTrackingMethodToHrs',
      '_setHrsInput',
      '_setMinsInput'
    );
  }
  _setTrackingMethodToHrs() {
    if (this.props.timeTrackMethod.hours) { return; }
    NewTimesheetActions.setTimeTrackToHrs();
  }
  _setTrackingMethodToMins() {
    if (this.props.timeTrackMethod.mins) { return; }
    NewTimesheetActions.setTimeTrackToMins();
  }
  _toggleTimeTrackMethodSetting() {
    this.setState({ 
      showTimeTrackMethodSetting: !this.state.showTimeTrackMethodSetting 
    });
  }
  _setHrsInput(e) {
    debugger;
    NewTimesheetActions.setHours(parseInt(e.target.value));
  }
  _setMinsInput(e) {
    NewTimesheetActions.setMins(parseInt(e.target.value));
  }
  render() {
    let p = this.props;
    let s = this.state;
    let trackByHours = p.timeTrackMethod.hours;
    let trackbyMinutes = p.timeTrackMethod.minutes;
    let timeTrackMethodText;
    let inputField;

    if (trackByHours) {
      timeTrackMethodText = 'Hrs';
      inputField = (
        <div>
          <InputFieldLabel error={p.error} labelName={'Track Time'} />
          <input placeholder='0:00 hrs' onChange={this._setHrsInput}></input>
        </div>
      );
    } else if (trackByMinutes) {
      timeTrackMethodText = 'Mins';
      inputField = (
        <div>
          <InputFieldLabel error={p.error} labelName={'Track Time'} />
          <input placeholder='000 mins' onChange={this._setMinsInput}></input>
        </div>
      );
    }

    return (
      <div className='time-tracker-field-wrapper'>
        {inputField}
        <small 
          onMouseEnter={this._toggleTimeTrackMethodSetting} 
          onMouseLeave={this._toggleTimeTrackMethodSetting}>
          {timeTrackMethodText}
        </small>

        {s.showTimeTrackMethodSetting &&
          <div className='pop-up-settings'>
            <small onClick={this._setTimeTrackToHrs}>Track by Hours</small>
            <small onClick={this._setTimeTrackToMins}>Track by Minutes</small>
          </div>
        }

      </div>
    );
  }
}

TimeTrackerField.propTypes = {
  error: React.PropTypes.any,
  timeTrackMethod: React.PropTypes.object.isRequired,
};