import React from 'react';
import _ from 'lodash';
import ReactTemplate from '.././shared/ReactTemplate';

import Spinner from '.././shared/Spinner';
import InputField from '.././shared/InputField';
import TextField from '.././shared/TextField';
import SelectBox from '.././shared/SelectBox';
import TimeTrackerField from '.././shared/TimeTrackerField';

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
      '_regenerateForm'
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
  _onSelectWorkType(e) {
    NewTimesheetActions.setWorkType(e.target.value);
  }
  _onSubmitTimesheet() {
    NewTimesheetActions.submitTimesheet();
  }
  _regenerateForm() {
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
      submitButton = <div className='button' onClick={this._onSubmitTimesheet}>Submit Timesheet</div>;
    } else {
      submitButton = <div className='button inactive-button'>Fill the fields</div>;
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
          <h2>Thanks for submitting!</h2>
          <div className='button' onClick={this._regenerateForm}>Submit Another!</div>
        </div>
      ); 
    }

    return (
      <div className='new-timesheet-form-wrapper'>
        <h2 className='form-title'>New Timesheet Entry</h2>
        <div className='subform subform-left'>
          <InputField
            label='Email Address'
            type='email'
            inputPlaceholder='email@domain.com'
            error={s.errors.email}
            onInputChange={this._onChangeEmail}
          />
          <SelectBox
            options={p.workTypes}
            error={s.errors.workType}
            labelName='Work Type'
            selectPlaceholder='Select Work Type'
            onSelectChange={this._onSelectWorkType}
          />
          <TextField
            label='Notes (optional)'
            inputPlaceholder='Leave a note about this entry'
            onInputChange={this._onChangeNote}
          />
        </div>
        <div className='subform subform-right'>
          <TimeTrackerField
            error={s.errors.timeInSeconds}
          />
          {submitButton}
        </div>
      </div>
    );
  }
}

NewTimesheetForm.propTypes = {
  workTypes: React.PropTypes.array.isRequired,
};