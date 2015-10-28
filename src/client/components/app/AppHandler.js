import React, {Component} from 'react';

import AppHeader from './AppHeader';
import FullScreenModal from '.././shared/FullScreenModal';
import NewNoteForm from '.././notes/NewNoteForm';
import NewGroupForm from '.././groups/NewGroupForm';
import Spinner from '.././ux/Spinner';

import AuthActions from '../.././actions/AuthActions';
import AuthStore from '../.././stores/AuthStore';
import AppStore from '../.././stores/AppStore';

export default class AppHandler extends Component {

  static displayName = 'AppHandler';

  constructor (props) {
    super(props);
    this.state = this._getInitialState();
  }

  componentDidMount () {
    this._unsubscribeAppStore = AppStore.listen(this._updateAppState);
    this._unsubscribeAuthStore = AuthStore.listen(this._updateAuthState);

    // As soon as the component mounts, we're going to make an API call for the
    // current user is there's a token in localStorage
    const jwt = localStorage.getItem('jwt');

    // If there's no JWT, we just set the component as ready and display the landing page
    if (!Boolean(jwt)) return this.setState({componentReady: true});

    AuthActions.autoLoginUser(localStorage.getItem('jwt'));
  }

  componentWillUnmount () {
    this._unsubscribeAppStore();
    this._unsubscribeAuthStore();
  }

  render () {
    // Shows the spinner if the component is not yet loaded
    if (!this.state.componentLoaded) return <Spinner fullScreen={true} />;

    let modal;

    // If the user is creating a new note.
    if (this.state.modal.newNote) {
      const modalContent = <NewNoteForm currentUser={this.state.currentUser} />
      modal = <FullScreenModal content={modalContent} />;
    }

    // If the user is creating a new group.
    if (this.state.modal.newGroup) {
      const modalContent = <NewGroupForm currentUser={this.state.currentUser} />
      modal = <FullScreenModal content={modalContent} />;
    }

    return (
      <div className='page-wrapper'>
        {modal}
        <AppHeader currentUser={this.state.currentUser} />
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
      componentLoaded: false,
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
    this.setState({currentUser: state.currentUser});
  }

}