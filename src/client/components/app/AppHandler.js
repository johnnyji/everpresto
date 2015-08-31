import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';
import { RouteHandler } from 'react-router';

import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import FullScreenModal from '.././shared/FullScreenModal';
import NewTimesheetForm from '.././timesheet/NewTimesheetForm';

import AppActions from '../.././actions/AppActions';
import AppStore from '../.././stores/AppStore';

export default class AppHandler extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = this._getInitialState();
    this._bindFunctions(
      '_getInitialState',
      '_updateState'
    )
  }
  componentWillMount() {
    // sets the current user if the jwt is present in localStorage
    if (localStorage.jwt) {
      AppActions.setCurrentUser(localStorage.jwt);
    }
  }
  componentDidMount() {
    this._unsubscribe = AppStore.listen(this._updateState);    
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  _getInitialState() {
    let state = AppStore.getState();
    return {
      currentUser: state.currentUser,
      modal: state.modal,
      workTypes: state.workTypes,
    }
  }
  _updateState(state) {
    this.setState({
      currentUser: state.currentUser,
      modal: state.modal,
      workTypes: state.workTypes,
    });
  }
  render() {
    let p = this.props;
    let s = this.state;
    let modal;
    
    if (s.modal.newTimesheet) {
      let modalContent = <NewTimesheetForm workTypes={s.workTypes} />
      modal = <FullScreenModal modalContent={modalContent} />;
    }

    return (
      <div className='page-wrapper'>
        {modal}
        <AppHeader currentUser={s.currentUser} />
        <div className='content-container'>
          <RouteHandler />
        </div>
      </div>
    );
  }
}
