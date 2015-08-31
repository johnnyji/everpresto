import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import ErrorMessageBox from '.././shared/ErrorMessageBox';

import AuthActions from '../.././actions/AuthActions';

export default class RegistrationForm extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions('_registerUser');
  }
  _registerUser(e) {
    e.preventDefault();
    let userData = {
      email: React.findDOMNode(this.refs.email).value,
      password: React.findDOMNode(this.refs.password).value,
      passwordConfirmation: React.findDOMNode(this.refs.passwordConfirmation).value
    };
    AuthActions.createUser({ user: userData });
  }
  _dismissError() {
    this.setState({ registrationError: null });
  }
  render() {
    let p = this.props;

    return (
      <form onSubmit={this._registerUser}>
        <ErrorMessageBox message={p.registrationError} dismissError={this._dismissError} />
        <label>Email</label>
        <input type='email' ref='email'/>
        <label>Password</label>
        <input type='password' ref='password'/>
        <label>Confirm Password</label>
        <input type='password' ref='passwordConfirmation'/>
        <input type='submit' defaultValue='Join' />
      </form>
    );
  }
}

RegistrationForm.propTypes = {
  registrationError: React.PropTypes.string
};