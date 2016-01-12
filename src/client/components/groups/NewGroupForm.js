// import React, {Component, PropTypes} from 'react';
// import _ from 'lodash';

// import GroupNameInput from './GroupNameInput';
// import GroupAddMembersInput from './GroupAddMembersInput';

// import AppActions from '../.././actions/AppActions';
// import NewGroupActions from '../.././actions/NewGroupActions';
// import NewGroupStore from '../.././stores/NewGroupStore';

// import ExitFormIcon from '.././shared/ExitFormIcon';
// import InputField from '.././shared/InputField';

// export default class NewGroupForm extends Component {

//   constructor(props) {
//     super(props);
//     this.state = this._getInitialState();
//   }

//   componentDidMount() {
//     this._unsubscribe = NewGroupStore.listen(this._updateState);
//     NewGroupActions.setGroupCreator(this.props.currentUser);
//   }

//   compoenentDidUnmount() {
//     this._unsubscribe();
//   }

//   componentWillUnmount() {
//     NewGroupActions.resetState();
//   }

//   render() {
//     const phases = [
//       <GroupNameInput error={this.state.errors.name} />,
//       <GroupAddMembersInput
//         contacts={this.props.currentUser.contacts}
//         error={this.state.errors.members} />
//     ];

//     return (
//       <div className='new-group-form-wrapper'>
//         <ExitFormIcon onExitClick={this._exitForm} />
//         {phases[this.state.activeFormPhaseIndex]}
//       </div>
//     );
//   }

//   _exitForm = () => {
//     AppActions.toggleModal();
//   }

//   _getInitialState = () => {
//     let state = NewGroupStore.getState();
//     return {
//       group: state.group,
//       errors: state.errors,
//       activeFormPhaseIndex: state.activeFormPhaseIndex
//     };
//   }

//   _updateState = (state) => {
//     this.setState({
//       group: state.group,
//       errors: state.errors,
//       activeFormPhaseIndex: state.activeFormPhaseIndex
//     });
//   }

// }