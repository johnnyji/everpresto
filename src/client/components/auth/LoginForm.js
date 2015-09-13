import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import AuthActions from '../.././actions/AuthActions';
import AuthStore from '../.././stores/AuthStore';

export default class LoginForm extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = { loginError: AuthStore.getState.loginError };
    this._bindFunctions(
      '_loginUser',
      '_updateState'
    );
  }
  componentDidMount() {
    this._unsubscribe = AuthStore.listen(this._updateState);
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  _updateState(state) {
    this.setState({ loginError: state.loginError });
  }
  _loginUser(e) {
    e.preventDefault();
    let userData = {
      email: React.findDOMNode(this.refs.email).value,
      password: React.findDOMNode(this.refs.password).value
    };

    AuthActions.loginUser({ user: userData });
  }
  render() {
    let s = this.state;

    return (
      <form className='login-form-wrapper' onSubmit={this._loginUser}>
        {s.loginError && <p>{s.loginError}</p>}

        <label>Email</label>
        <input type='email' ref='email' />

        <label>Password</label>
        <input type='password' ref='password' />

        <input type='submit' defaultValue='Login' />
      </form>
    );
  }
}
