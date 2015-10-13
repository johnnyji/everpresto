import React, {PropTypes} from 'react';

import AuthActions from '../.././actions/AuthActions';
import AuthStore from '../.././stores/AuthStore';
import Spinner from '.././ux/Spinner';

// wrapper component for protecting authenticated components

export default (ComponentToBeRendered) => {
  class ProtectedComponent extends React.Component {

    static contextTypes = {
      router: PropTypes.func
    }

    constructor (props) {
      super(props);
      this.state = { currentUser: AuthStore.getCurrentUser() };
      this._updateState = this._updateState.bind(this);
    }

    componentDidMount () {
      this._unsubscribe = AuthStore.listen(this._updateState);

      // if the current user already exists, just return out
      if (this.state.currentUser) return;

      let jwt = localStorage.getItem('jwt');
      let unauthorized = !this.state.currentUser && !jwt;
      
      if (jwt) AuthActions.autoLoginUser(jwt, this.context.router.getCurrentPathname());
      if (unauthorized) this.context.router.transitionTo('/login');
    }

    componentWillUnmount () {
      this._unsubscribe();
    }

    _updateState (state) {
      this.setState({ currentUser: state.currentUser });
    }

    render() {
      if (this.state.currentUser) {
        return <ComponentToBeRendered {...this.props} currentUser={this.state.currentUser} />;
      } else {
        return <Spinner fullScreen={true} />;
      }
    }
  }

  return ProtectedComponent;
}