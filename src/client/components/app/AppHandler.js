import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';
import { RouteHandler } from 'react-router';

import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import FullScreenModal from '.././shared/FullScreenModal';
import NewTimesheetForm from '.././timesheet/NewTimesheetForm';

import AuthActions from '../.././actions/AuthActions';
import AuthStore from '../.././stores/AuthStore';
import AppStore from '../.././stores/AppStore';

export default class AppHandler extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = this._getInitialState();
    this._bindFunctions(
      '_getInitialState',
      '_updateAppState',
      '_updateAuthState'
    );
  }
  componentDidMount() {
    this._unsubscribeAppStore = AppStore.listen(this._updateAppState);
    this._unsubscribeAuthStore = AuthStore.listen(this._updateAuthState);
  }
  componentWillUnmount() {
    this._unsubscribeAppStore();
    this._unsubscribeAuthStore();
  }
  _getInitialState() {
    let authState = AuthStore.getState();
    let appState = AppStore.getState();
    return {
      currentUser: authState.currentUser,
      modal: appState.modal,
      workTypes: appState.workTypes,
    }
  }
  _updateAppState(state) {
    this.setState({
      modal: state.modal,
      workTypes: state.workTypes,
    });
  }
  _updateAuthState(state) {
    this.setState({ currentUser: state.currentUser });
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

AppHandler.contextTypes = {
  router: React.PropTypes.func
};