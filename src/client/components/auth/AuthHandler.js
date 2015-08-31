import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

import AuthStore from '../.././stores/AuthStore';

export default class AuthHandler extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = this._getInitialState();
    this._bindFunctions(
      '_getInitialState',
      '_updateState'
    );
  }
  componentDidMount() {
    this._unsubscribe = AuthStore.listen(this._updateState);
  }
  componentWillUnmount() {
    this._unsubscribe(); 
  }
  _getInitialState() {
    let state = AuthStore.getState();
    return {
      user: state.user,
      errors: state.errors,
      loginError: state.loginError,
      registrationError: state.registrationError
    };
  }
  _updateState(state) {
    this.setState({
      user: state.user,
      errors: state.errors, 
      loginError: state.loginError,
      registrationError: state.registrationError
    });
  }
  render() {
    let s = this.state;
    let path = this.context.router.getCurrentPathname();
    
    if (path === '/login') {
      return (
        <LoginForm 
          loginError={s.loginError}
          errors={s.errors}
          user={s.user}
        />
      );
    } else if (path === '/join') {
      return (
        <RegistrationForm
          errors={s.errors}
          user={s.user}
          registrationError={s.registrationError}
        />
      );
    }

  }
}
