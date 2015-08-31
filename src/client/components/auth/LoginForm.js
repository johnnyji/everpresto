import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import AuthActions from '../.././actions/AuthActions';

export default class LoginForm extends ReactTemplate {
  constructor(props) {
    super(props);
    this.state = { loginError: null };
    this._bindFunctions('_loginUser');
  }
  _loginUser(e) {
    let loginData = {
      email: React.findDOMNode('email'),
      password: React.findDOMNode('password')
    };
    AuthActions.loginUser({ user: loginData });
  }
  render() {
    let p = this.props;
    let s = this.state;

    return (
      <form className='login-form-wrapper' onSubmit={this._loginUser}>
        {s.loginError && <p>{s.loginError}</p>}
        <label>Email</label>
        <input type='email' ref='email' />
        <label>Password</label>
        <input type='password' ref='email' /> 
        <input type='submit' defaultValue='Login' />
      </form>
    );
  }
}
