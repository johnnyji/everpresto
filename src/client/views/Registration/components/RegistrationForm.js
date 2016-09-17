import React, {PropTypes, PureComponent} from 'react';
import AppActionCreators from '../../../actions/AppActionCreators';
import AuthActionCreators from '../../../actions/AuthActionCreators';
import Button from 'ui-components/src/Button';
import classNames from 'classnames';
import {fromJS} from 'immutable';
import Input, {validators} from 'ui-components/src/Input';
import styles from '../styles/RegistrationForm.scss';

const VALIDATE_FIRST_NAME = validators.minLength(1, 'You\'re first name please!');
const VALIDATE_PASSWORD = validators.minLength(8, 'Passwords must be at least 8 characters!');
const VALIDATE_LAST_NAME = validators.minLength(1, 'You\'re last name please!');
const VALIDATE_EMAIL = validators.email('That\'s not a valid email');
const VALIDATE_COMPANY_NAME = validators.minLength(1, 'Please provide your company\'s name');

export default class RegistrationForm extends PureComponent {

  static displayName = 'RegistrationForm';

  static propTypes = {
    className: PropTypes.string
  };

  state = {
    form: fromJS({
      company: {
        name: {error: null, value: ''}
      },
      user: fromJS({
        firstName: {error: null, value: ''},
        lastName: {error: null, value: ''},
        email: {error: null, value: ''},
        password: {error: null, value: ''},
        passwordConfirmation: {error: null, value: ''}
      })
    })
  };

  render() {
    const {form} = this.state;
    const firstName = form.getIn(['user', 'firstName', 'value']);

    return (
      <div className={classNames(styles.main, this.props.className)}>
        <header className={styles.header}>
          {firstName.length ? `Welcome ${firstName}!` : 'Welcome!'}
        </header>
        <Input
          autoFocus={true}
          className={styles.input}
          error={form.getIn(['company', 'name', 'error'])}
          label='Company'
          name='company:name'
          onEnterKeyPress={this._handleFormSubmission}
          onUpdate={this._handleInputUpdate}
          patternMatches={VALIDATE_COMPANY_NAME}
          value={form.getIn(['company', 'name', 'value'])} />
        <Input
          className={styles.input}
          error={form.getIn(['user', 'firstName', 'error'])}
          label='Jason'
          name='user:firstName'
          onEnterKeyPress={this._handleFormSubmission}
          onUpdate={this._handleInputUpdate}
          patternMatches={VALIDATE_FIRST_NAME}
          value={form.getIn(['user', 'firstName', 'value'])} />
        <Input
          className={styles.input}
          error={form.getIn(['user', 'lastName', 'error'])}
          label='Bourne'
          name='user:lastName'
          onEnterKeyPress={this._handleFormSubmission}
          onUpdate={this._handleInputUpdate}
          patternMatches={VALIDATE_LAST_NAME}
          value={form.getIn(['user', 'lastName', 'value'])} />
        <Input
          className={styles.input}
          error={form.getIn(['user', 'email', 'error'])}
          label='jasonbourne@gmail.com'
          name='user:email'
          onEnterKeyPress={this._handleFormSubmission}
          onUpdate={this._handleInputUpdate}
          patternMatches={VALIDATE_EMAIL}
          type='email'
          value={form.getIn(['user', 'email', 'value'])} />
        <Input
          className={styles.input}
          error={form.getIn(['user', 'password', 'error'])}
          label='Password'
          name='user:password'
          onEnterKeyPress={this._handleFormSubmission}
          onUpdate={this._handlePasswordUpdate}
          patternMatches={VALIDATE_PASSWORD}
          type='password'
          value={form.getIn(['user', 'password', 'value'])} />
        <Input
          className={styles.input}
          error={form.getIn(['user', 'passwordConfirmation', 'error'])}
          label='Confirm Password'
          name='user:passwordConfirmation'
          onEnterKeyPress={this._handleFormSubmission}
          onUpdate={this._handlePasswordConfirmationUpdate}
          patternMatches={VALIDATE_PASSWORD}
          type='password'
          value={form.getIn(['user', 'passwordConfirmation', 'value'])} />
        <footer className={styles.footer}>
          <Button className={styles.submitButton} onClick={this._handleFormSubmission} isPill={true}>
            Done!
          </Button>
        </footer>
      </div>
    );
  }

  _handleFormSubmission = () => {
    const company = this.state.form.get('company');
    const user = this.state.form.get('user');

    // Dispatches a message for any empty fields
    const emptyFields = company.find((x) => x.get('value') == null) || user.find((x) => x.get('value') == null);
    if (emptyFields) {
      this.context.dispatch(AppActionCreators.createFlashMessage('red', 'Please fill out all the fields'));
      return;
    }

    // Dispatches a message for any errors
    const firstError = company.find((x) => x.get('error') != null) || user.find((x) => x.get('error') != null);
    if (firstError) {
      this.context.dispatch(AppActionCreators.createFlashMessage('red', firstError));
      return;
    }

    // Dispatches the create user
    this.context.dispatch(
      AuthActionCreators.createCompanyWithUser({
        company: company.reduce((accum, value, key) => ({...accum, [key]: value.get('value')}), {}),
        user: user.reduce((accum, value, key) => ({...accum, [key]: value.get('value')}), {})
      })
    );
  }

  _handleInputUpdate = (value, error, name) => {
    this.setState({form: this._updateForm(value, error, name)});
  };

  _handlePasswordUpdate = (value, error, name) => {
    let form = this._updateForm(value, error, name);

    // If password doesnt match confirm
    if (this.state.form.getIn(['user', 'passwordConfirmation', 'value']) !== value) {
      form = form
        .setIn(['user', 'password', 'error'], 'Both passwords must match')
        .setIn(['user', 'passwordConfirmation', 'error'], 'Both passwords must match');
    }

    this.setState({form});
  };

  _handlePasswordConfirmationUpdate = (value, error, name) => {
    let form = this._updateForm(value, error, name);

    // If the confirmation field has no errors and both the passwords match. We want to clear
    // the password's errors as well
    if (this.state.form.getIn(['user', 'password', 'value']) !== value) {
      form = form
        .setIn(['user', 'password', 'error'], 'Both passwords must match')
        .setIn(['user', 'passwordConfirmation', 'error'], 'Both passwords must match');
    }

    this.setState({form});
  };

  _updateForm = (value, error, name) => {
    const updatePath = name.split(':');
    return this.state.form
      .setIn(updatePath.concat(['value']), value)
      .setIn(updatePath.concat(['error']), error);
  };

}
