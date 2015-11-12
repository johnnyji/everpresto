import React, {Component, PropTypes} from 'react';

import FullScreenModal from '.././shared/FullScreenModal';
import NewNoteForm from '.././notes/NewNoteForm';
import NewGroupForm from '.././groups/NewGroupForm';

import AuthActions from '../.././actions/AuthActions';
import AuthStore from '../.././stores/AuthStore';
import AppStore from '../.././stores/AppStore';

class AppHandler extends Component {

  static displayName = 'AppHandler';

  static contextTypes = {
    currentUser: PropTypes.object,
    history: PropTypes.object.isRequired
  };

  constructor (props) {
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

  render () {
    const {currentUser} = this.context;

    let modal;

    // If the user is creating a new note.
    if (this.state.modal.newNote) {
      const modalContent = <NewNoteForm currentUser={currentUser} />
      modal = <FullScreenModal content={modalContent} />;
    }

    // If the user is creating a new group.
    if (this.state.modal.newGroup) {
      const modalContent = <NewGroupForm currentUser={currentUser} />
      modal = <FullScreenModal content={modalContent} />;
    }
    
    return (
      <div className='page-wrapper'>
        {modal}
        <div className='content-container'>
          {/*Allows the React Router to run the correct child route, replaced RouteHandler in v1.0.0*/}
          {this.props.children}
        </div>
      </div>
    );
  }

  _getInitialState = () => {
    const authState = AuthStore.getState();
    const appState = AppStore.getState();
    return {
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

}

export default AppHandler;