import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import InputField from '.././shared/InputField';
import Icon from '.././shared/Icon';

import NewGroupActions from '../.././actions/NewGroupActions';

export default class GroupNameInput extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions(
      '_incrementActiveFormPhaseIndex',
      '_onUserInput'
    );
  }
  _onUserInput(e) {
    NewGroupActions.handleNameChange(e.target.value);
  }
  _incrementActiveFormPhaseIndex() {
    NewGroupActions.incrementActiveFormPhaseIndex();
  }
  render() {
    let p = this.props;

    return (
      <div className='group-name-input-wrapper'>
        <InputField
          type='text'
          label='Select a name for your group!'
          error={p.error}
          inputPlaceholder='(i.e. Engineering Team)'
          onInputChange={this._onUserInput}
        />
        <button onClick={this._incrementActiveFormPhaseIndex}>
          Next <Icon icon='chevron-right' />
        </button>
      </div>
    );
  }
}
