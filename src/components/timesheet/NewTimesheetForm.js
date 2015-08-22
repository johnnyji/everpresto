import React from 'react';
import _ from 'lodash';
import ReactTemplate from '.././shared/ReactTemplate';

import InputField from '.././shared/InputField';
import SelectBox from '.././shared/SelectBox';

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
      '_onSelectWorkType'
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
      errors: state.errors
    };
  }
  _updateState(state) {
    this.setState({
      errors: state.errors
    });
  }
  _onChangeEmail(e) {
    NewTimesheetActions.setEmail(e.target.value);
  }
  _onSelectWorkType(e) {
    NewTimesheetActions.setWorkType(e.target.value);
  }
  render() {
    let p = this.props;
    let s = this.state;
    
    return (
      <div className='new-timesheet-form-wrapper'>
        <h2>New Timesheet Entry</h2>
        <InputField
          type='email'
          ref='email'
          name='email'
          inputPlaceholder='email@domain.com'
          className='input-field'
          error={s.errors.email}
          onInputChange={this._onChangeEmail}
        />
        <SelectBox
          options={p.workTypes}
          selectPlaceholder='Select Work Type'
          onSelectChange={this._onSelectWorkType}
        />
      </div>
    );
  }
}

NewTimesheetForm.propTypes = {
  workTypes: React.PropTypes.array.isRequired,
};