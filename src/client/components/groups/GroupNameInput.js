import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import InputField from '.././shared/InputField';
import Icon from '.././shared/Icon';

import NewGroupActions from '../.././actions/NewGroupActions';

export default class GroupNameInput extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions(
      '_setGroupName'
    );
  }
  _setGroupName() {
    let name = React.findDOMNode(this.refs.name.refs.input).value;
    NewGroupActions.setGroupName(name);
  }
  render() {
    let p = this.props;

    return (
      <div className='group-name-input-wrapper'>
        <InputField
          type='text'
          ref='name'
          label='Select a name for your group!'
          error={p.error}
          inputPlaceholder='(i.e. Engineering Team)'
        />
        <button onClick={this._setGroupName}>
          Next <Icon icon='chevron-right' />
        </button>
      </div>
    );
  }
}
