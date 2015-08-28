import React from 'react';
import _ from 'lodash';
import ReactTemplate from '.././shared/ReactTemplate';

import Icon from '.././shared/Icon';
import ExitFormIcon from '.././shared/ExitFormIcon';
import Spinner from '.././shared/Spinner';
import InputField from '.././shared/InputField';
import TextField from '.././shared/TextField';
import SelectBox from '.././shared/SelectBox';

import TimeTrackerField from '.././shared/TimeTrackerField';
import PostTimesheetSubmissionView from './PostTimesheetSubmissionView';

import AppActions from '../.././actions/AppActions';
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
      postCreateTimesheet: state.postCreateTimesheet
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
  _onSelectWorkType(workType) {
    NewTimesheetActions.setWorkType(workType);
  }
  _onSubmitTimesheet() {
    NewTimesheetActions.submitTimesheet(this.state.timesheet);
  }
  _regenerateForm() {
    NewTimesheetActions.resetState();
  }
  _clearForm() {
    this.refs.email.refs.input.getDOMNode().value = '';
    // This targets the DropdownList component, finds the field that represents the input and sets that field's value to empty
    this.refs.workType.refs.select.getDOMNode().getElementsByClassName('rw-input')[0].innerHTML = this.props.workTypeDefaultValue;

    this.refs.notes.refs.textarea.getDOMNode().value = '';
    this.refs.tracker.refs.hours.getDOMNode().value = this.props.hoursInputDefaultValue;
    this.refs.tracker.refs.minutes.getDOMNode().value = this.props.minutesInputDefaultValue;
    NewTimesheetActions.resetState();
  }
  _exitForm() {
    AppActions.toggleModal();
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
          <ExitFormIcon onExitClick={this._exitForm} />
          <PostTimesheetSubmissionView 
            timesheet={s.timesheet}
            regenerateForm={this._regenerateForm}
          />
        </div>
      ); 
    }

    return (
      <div className='new-timesheet-form-wrapper'>
        <ExitFormIcon onExitClick={this._exitForm} />
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
            selectPlaceholder={p.workTypeDefaultValue}
            onSelectChange={this._onSelectWorkType}
          />
          <TextField
            ref='notes'
            label='Message (optional)'
            inputPlaceholder='Leave a message...'
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
        <small className='clear-form-button' onClick={this._clearForm}>Reset Form</small>
      </div>
    );
  }
}

NewTimesheetForm.propTypes = {
  workTypes: React.PropTypes.array.isRequired,
};

NewTimesheetForm.defaultProps = {
  hoursInputDefaultValue: '00',
  minutesInputDefaultValue: '00',
  workTypeDefaultValue: 'Select work type'
};