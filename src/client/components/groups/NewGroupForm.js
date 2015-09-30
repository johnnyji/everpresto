import React from 'react';
import _ from 'lodash';
import ReactTemplate from '.././shared/ReactTemplate';

import GroupNameInput from './GroupNameInput';
import GroupAddMembersInput from './GroupAddMembersInput';

import AppActions from '../.././actions/AppActions';
import NewGroupActions from '../.././actions/NewGroupActions';
import NewGroupStore from '../.././stores/NewGroupStore';

import ExitFormIcon from '.././shared/ExitFormIcon';
import InputField from '.././shared/InputField';

export default class NewGroupForm extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = this._getInitialState();
    this._bindFunctions(
      '_exitForm',
      '_updateState'
    );
  }
  componentDidMount() {
    this._unsubscribe = NewGroupStore.listen(this._updateState);
    NewGroupActions.setGroupCreator(this.props.currentUser);
  }
  compoenentDidUnmount() {
    this._unsubscribe();
  }
  _getInitialState() {
    let state = NewGroupStore.getState();
    return {
      group: state.group,
      errors: state.errors,
      activeFormPhaseIndex: state.activeFormPhaseIndex
    };
  }
  _updateState(state) {
    this.setState({
      group: state.group,
      errors: state.errors,
      activeFormPhaseIndex: state.activeFormPhaseIndex
    });
  }
  _exitForm() {
    AppActions.toggleModal();
  }
  render() {
    let p = this.props;
    let s = this.state;
    let phases = [
      <GroupNameInput error={s.errors.name} />,
      <GroupAddMembersInput contacts={p.currentUser.contacts} />
    ];

    return (
      <div className='new-group-form-wrapper'>
        <ExitFormIcon onExitClick={this._exitForm} />
        {phases[s.activeFormPhaseIndex]}
      </div>
    );
  }
}

NewGroupForm.propTypes = {
  currentUser: React.PropTypes.object.isRequired
};