import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import AppActions from '../.././actions/AppActions';

import ExitFormIcon from '.././shared/ExitFormIcon';
import InputField from '.././shared/InputField';

export default class NewGroupForm extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions(
      '_exitForm'
    );
  }
  _exitForm() {
    AppActions.toggleModal();
  }
  render() {
    return (
      <div className='new-group-form-wrapper'>
        <ExitFormIcon onExitClick={this._exitForm} />
        <h2>New Group</h2>
        <InputField 
          type='text'
          placeholder='Your Group Name'
        />
      </div>
    );
  }
}

NewGroupForm.propTypes = {
  currentUser: React.PropTypes.object.isRequired
};