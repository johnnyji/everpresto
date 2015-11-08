import React, {Component} from 'react';

import Button from '.././ui/Button';
import InputField from '.././shared/InputField';
import Icon from '.././ui/Icon';

import NewGroupActions from '../.././actions/NewGroupActions';

export default class GroupNameInput extends Component {

  render() {
    return (
      <div className='group-name-input-wrapper'>
        <InputField
          type='text'
          ref='name'
          label='Select a name for your group!'
          error={this.props.error}
          inputPlaceholder='(i.e. Engineering Team)'
        />
        <Button onClick={this._setGroupName}>
          Next <Icon icon='chevron-right' />
        </Button>
      </div>
    );
  }

  _setGroupName = () => {
    const name = this.refs.name.refs.input.value;
    NewGroupActions.setGroupName(name);
  }

}