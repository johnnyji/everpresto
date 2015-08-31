import React from 'react';
import ReactTemplate from '.././shared/ReactTemplate';

import ErrorMessageBox from '.././shared/ErrorMessageBox';
import InputField from '.././shared/InputField';

import AuthActions from '../.././actions/AuthActions';

export default class RegistrationForm extends ReactTemplate {
  constructor(props) {
    super(props);
    this._bindFunctions(
      '_handleEmailChange',
      '_handlePasswordChange',
      '_handlePasswordConfirmationChange',
      '_registerUser'
    );
  }
  _handleEmailChange(e) {
    AuthActions.handleEmailChange(e.target.value);
  }
  _handlePasswordChange(e) {  
    AuthActions.handlePasswordChange(e.target.value);
    AuthActions.handlePasswordConfirmationChange(this.props.user.passwordConfirmation);
  }
  _handlePasswordConfirmationChange(e) {
    AuthActions.handlePasswordConfirmationChange(e.target.value);
  }
  _registerUser(e) {
    e.preventDefault();
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
        <InputField
          label='Email'
          type='email'
          error={p.errors.email}
          onInputChange={this._handleEmailChange}
        />
        <InputField
          label='Password'
          type='password'
          error={p.errors.password}
          onInputChange={this._handlePasswordChange}
        />
        <InputField
          label='Confirm Password'
          type='password'
          error={p.errors.passwordConfirmation}
          onInputChange={this._handlePasswordConfirmationChange}
        />
        <input type='submit' defaultValue='Join' />
      </form>
    );
  }
}

RegistrationForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  errors: React.PropTypes.object.isRequired,
  registrationError: React.PropTypes.string
};