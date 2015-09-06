import React from 'react';

import AuthStore from '../.././stores/AuthStore';

// wrapper component for protecting authenticated components

export default (ComponentToBeRendered) => {  
  return class ProtectedComponent extends React.Component {
    // called before transitioning to component, will redirect user to login if unauthenticated
    static willTransitionTo(transition) {
      if (!AuthStore.getCurrentUser) {
        transition.redirect('/login');
      }
    }
    constructor(props) {
      super(props);
      this.state = {
        currentUser: AuthStore.getCurrentUser(),
        jwt: AuthStore.getJwt()
      };
      this._updateState = this._updateState.bind(this);
    }
    componentDidMount() {
      this._unsubscribe = AuthStore.listen(this._updateState); 
    }
    componentWillUnmount() {
      this._unsubscribe();
    }
    _updateState(state) {
      this.setState({
        currentUser: state.currentUser,
        jwt: state.jwt
      });
    }
    render() {
      return (
        <ComponentToBeRendered
          {...this.props}
          currentUser={this.state.currentUser}
          jwt={this.state.jwt}
        />
      );
    }
  }
}