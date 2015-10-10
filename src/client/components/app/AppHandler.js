import React from 'react';
import { RouteHandler } from 'react-router';

import AppHeader from './AppHeader';
import FullScreenModal from '.././shared/FullScreenModal';
import NewTimesheetForm from '.././timesheet/NewTimesheetForm';
import NewNoteForm from '.././notes/NewNoteForm';
import NewGroupForm from '.././groups/NewGroupForm';

import AuthActions from '../.././actions/AuthActions';
import AuthStore from '../.././stores/AuthStore';
import AppStore from '../.././stores/AppStore';

export default class AppHandler extends React.Component {

  constructor(props) {
    super(props);
    this.state = this._getInitialState();
  }

  componentDidMount () {
    this._unsubscribeAppStore = AppStore.listen(this._updateAppState);
    this._unsubscribeAuthStore = AuthStore.listen(this._updateAuthState);
  }

  componentWillUnmount () {
    this._unsubscribeAppStore();
    this._unsubscribeAuthStore();
  }

  _getInitialState = () => {
    let authState = AuthStore.getState();
    let appState = AppStore.getState();
    return {
      currentUser: authState.currentUser,
      modal: appState.modal,
      workTypes: appState.workTypes,
    }
  }

  _updateAppState = (state) => {
    this.setState({
      modal: state.modal,
      workTypes: state.workTypes,
    });
  }

  _updateAuthState = (state) => {
    this.setState({ currentUser: state.currentUser });
  }

  render() {
    let modal;
    
    // If the user is creating a new note.
    if (this.state.modal.newNote) {
      const modalContent = <NewNoteForm currentUser={this.state.currentUser} />
      modal = <FullScreenModal modalContent={modalContent} />;
    }

    // If the user is creating a new group.
    if (this.state.modal.newGroup) {
      const modalContent = <NewGroupForm currentUser={this.state.currentUser} />
      modal = <FullScreenModal modalContent={modalContent} />;
    }

    return (
      <div className='page-wrapper'>
        {modal}
        <AppHeader currentUser={this.state.currentUser} />
        <div className='content-container'>
          <RouteHandler />
        </div>
      </div>
    );
  }

}