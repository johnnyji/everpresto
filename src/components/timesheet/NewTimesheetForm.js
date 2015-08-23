import React from 'react';
import _ from 'lodash';
import ReactTemplate from '.././shared/ReactTemplate';

import Spinner from '.././shared/Spinner';
import InputField from '.././shared/InputField';
import TextField from '.././shared/TextField';
import SelectBox from '.././shared/SelectBox';
import TimeTrackerField from '.././shared/TimeTrackerField';
import PostTimesheetSubmissionView from './PostTimesheetSubmissionView';

import NewTimesheetActions from '../.././actions/NewTimesheetActions';
import NewTimesheetStore from '../.././stores/NewTimesheetStore';


export default class NewTimesheetForm extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = this._getInitialState();
    this._bindFunctions(
      '_getInitialState',
      '_updateState',
      '_onChangeEmail',
      '_onChangeNote',
      '_onSelectWorkType',
      '_onSubmitTimesheet',
      '_regenerateForm',
      '_clearForm'
    );
  }
  componentDidMount() {
    this._unsubscribe = NewTimesheetStore.listen(this._updateState);
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  _getInitialState() {
    let state = NewTimesheetStore.getState();
    return {
      timesheet: state.timesheet,
      errors: state.errors,
      creatingTimesheet: state.creatingTimesheet,
      postCreateTimesheet: true
    };
  }
  _updateState(state) {
    this.setState({
      timesheet: state.timesheet,
      errors: state.errors,
      creatingTimesheet: state.creatingTimesheet,
      postCreateTimesheet: state.postCreateTimesheet
    });
  }
  _onChangeEmail(e) {
    NewTimesheetActions.setEmail(e.target.value);
  }
  _onChangeNote(e) {
    NewTimesheetActions.setNote(e.target.value);
  }
  _onSelectWorkType(e) {
    NewTimesheetActions.setWorkType(e.target.value);
  }
  _onSubmitTimesheet() {
    NewTimesheetActions.submitTimesheet();
  }
  _regenerateForm() {
    NewTimesheetActions.resetState();
  }
  _clearForm() {
    this.refs.email.refs.input.getDOMNode().value = '';
    this.refs.workType.refs.select.getDOMNode().value = '';
    this.refs.notes.refs.textarea.getDOMNode().value = '';
    this.refs.tracker.refs.hours.getDOMNode().value = '';
    this.refs.tracker.refs.minutes.getDOMNode().value = '';
    NewTimesheetActions.resetState();
  }
  render() {
    let p = this.props;
    let s = this.state;
    let noErrors = 
      _.isNull(s.errors.workType) && 
      _.isNull(s.errors.email) &&
      _.isNull(s.errors.timeInSeconds);
    let fieldsFilled =
      !_.isNull(s.timesheet.email) &&
      !_.isNull(s.timesheet.workType) &&
      !_.isNull(s.timesheet.timeInSeconds);
    let submitButton;

    if (noErrors && fieldsFilled) {
      submitButton = <button className='button' onClick={this._onSubmitTimesheet}>Submit Timesheet</button>;
    } else {
      submitButton = <button className='button inactive-button'>Fill the fields</button>;
    }

    if (s.creatingTimesheet) {
      return (
        <div className='new-timesheet-form-wrapper'>
          <Spinner />
        </div>
      );
    }

    if (s.postCreateTimesheet) {
      return (
        <div className='new-timesheet-form-wrapper'>
          <PostTimesheetSubmissionView 
            timesheet={s.timesheet}
            regenerateForm={this._regenerateForm}
          />
        </div>
      ); 
    }

    return (
      <div className='new-timesheet-form-wrapper'>
        <div className='subform subform-left'>
          <InputField
            ref='email'
            label='Email Address'
            type='email'
            inputPlaceholder='email@domain.com'
            error={s.errors.email}
            onInputChange={this._onChangeEmail}
          />
          <SelectBox
            ref='workType'
            options={p.workTypes}
            error={s.errors.workType}
            labelName='Work Type'
            selectPlaceholder='Select Work Type'
            onSelectChange={this._onSelectWorkType}
          />
          <TextField
            ref='notes'
            label='Notes (optional)'
            inputPlaceholder='Leave a note about this entry'
            onInputChange={this._onChangeNote}
          />
        </div>
        <div className='subform subform-right'>
          <TimeTrackerField
            ref='tracker'
            error={s.errors.timeInSeconds}
          />
          {submitButton}
        </div>
        <small className='clear-form-button' onClick={this._clearForm}>Clear Form</small>
      </div>
    );
  }
}

NewTimesheetForm.propTypes = {
  workTypes: React.PropTypes.array.isRequired,
};