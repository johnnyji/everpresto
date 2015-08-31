import React from 'react';

import AuthStore from '../.././stores/AuthStore';
import AppStore from '../.././stores/AppStore';

// wrapper womponent for protecting authenticated components

export default (ComponentToBeRendered) => {  
  return class AuthenticatedComponent extends React.Component {
    // called before transitioning to component, will redirect user to login if unauthenticated
    static willTransitionTo(transition) {
      if (!AuthStore.isLoggedIn()) {
        transition.redirect('/login');
      }
    }
    constructor(props) {
      super(props);
      this.state = {
        currentUser: AppStore.getCurrentUser(),
        apiToken: AppStore.getApiToken()
      };
      this._updateState = this._updateState.bind(this);
    }
    componentDidMount() {
      this._unsubscribe = AppStore.listen(this._updateState); 
    }
    componentWillUnmount() {
      this._unsubscribe();
    }
    _updateState(state) {
      this.setState({
        currentUser: state.currentUser,
        apiToken: state.apiToken
      });
    }
    render() {
      return (
        <ComponentToBeRendered
          {...this.props}
          currentUser={this.state.currentUser}
          apiToken={this.state.apiToken}
        />
      );
    }
  }
}