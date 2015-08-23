import React from 'react';
import ReactTemplate from './ReactTemplate'

import NewTimesheetActions from '../.././actions/NewTimesheetActions';

import InputFieldLabel from './InputFieldLabel';


export default class TimeTrackerField extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = { shrinkLabel: false };
    this._bindFunctions(
      '_handleInputFocus',
      '_handleInputBlur',
      '_clearPlaceholderTimeInput',
      '_setTime'
    );
  }
  _handleInputFocus() {
    this._clearPlaceholderTimeInput();
    this.setState({ shrinkLabel: true });
  }
  _handleInputBlur() {
   this.setState({ shrinkLabel: false }); 
  }
  _clearPlaceholderTimeInput() {
    let minutesValue = React.findDOMNode(this.refs.minutes).value;
    let hoursValue = React.findDOMNode(this.refs.hours).value;
    if (minutesValue === '00' && hoursValue === '00') {
      React.findDOMNode(this.refs.minutes).value = '';
      React.findDOMNode(this.refs.hours).value = '';
    }
  }
  _setTime() {
    let minutesValue = React.findDOMNode(this.refs.minutes).value;
    let hoursValue = React.findDOMNode(this.refs.hours).value;
    NewTimesheetActions.setTime(hoursValue, minutesValue);
  }
  render() {
    let p = this.props;
    let s = this.state;

    return (
      <div className='time-tracker-field-wrapper'>
        <InputFieldLabel shrinkLabel={s.shrinkLabel} error={p.error} labelName={'Track Time'} />
        <div className='tracker'>
          <input 
            type='text' 
            ref='hours' 
            className='hours-input'
            maxLength='2'
            defaultValue='00'
            placeholder='00'
            onFocus={this._handleInputFocus}
            onBlur={this._handleInputBlur}
            onChange={this._setTime}></input>
          <span>:</span>
          <input 
            type='text' 
            ref='minutes' 
            className='minutes-input'
            maxLength='2'
            defaultValue='00'
            placeholder='00' 
            onFocus={this._handleInputFocus}
            onBlur={this._handleInputBlur}
            onChange={this._setTime}></input>
          <small>Hrs</small>
        </div>
      </div>
    );
  }
}

TimeTrackerField.propTypes = {
  error: React.PropTypes.any
};