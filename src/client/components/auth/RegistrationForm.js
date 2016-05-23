import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import mergeDeep from '../.././utils/mergeDeep';
import Button from '.././ui/Button';
import Card from '.././ui/Card';
import Input from '.././ui/Input';
import {email, matchValue, minLength} from '../.././utils/RegexHelper';
import AppActionCreators from './../../actions/AppActionCreators';
import AuthActionCreators from './../../actions/AuthActionCreators';

const displayName = 'RegistrationForm';

export default class RegistrationForm extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      formData: Immutable.fromJS({
        company: {
          values: {
            name: ''
          },
          errors: {
            name: ''
          }
        },
        user: {
          values: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirmation: ''
          },
          errors: {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            passwordConfirmation: null
          }
        }
      })
    };
  }

  render () {
    const {formData} = this.state;

    return (
      <div className={`${displayName}`}>
        <Card className={`${displayName}-card'`}>
          <header className={`${displayName}-card-header`}>Welcome to the family!</header>
          <Input
            autoFocus={true}
            className={`${displayName}-card-input`}
            error={formData.getIn(['company', 'errors', 'name'])}
            errorKeys='company:errors:name'
            label='Company name'
            onEnterKeyPress={this._handleFormSubmission}
            onUpdate={this._handleInputUpdate}
            patternMatches={minLength(1, 'Please provide your company\'s name')}
            ref='company-name'
            successKeys='company:values:name'
            value={formData.getIn(['company', 'values', 'name'])} />
          <Input
            className={`${displayName}-card-input`}
            error={formData.getIn(['user', 'errors', 'firstName'])}
            errorKeys='user:errors:firstName'
            label='First name...'
            onEnterKeyPress={this._handleFormSubmission}
            onUpdate={this._handleInputUpdate}
            patternMatches={minLength(1, 'You\'re first name please!')}
            ref='user-firstName'
            successKeys='user:values:firstName'
            value={formData.getIn(['user', 'values', 'firstName'])} />
          <Input
            className={`${displayName}-card-input`}
            error={formData.getIn(['user', 'errors', 'lastName'])}
            errorKeys='user:errors:lastName'
            label='Last name!'
            onEnterKeyPress={this._handleFormSubmission}
            onUpdate={this._handleInputUpdate}
            patternMatches={minLength(1, 'You\'re last name please!')}
            ref='user-lastName'
            successKeys='user:values:lastName'
            value={formData.getIn(['user', 'values', 'lastName'])} />
          <Input
            className={`${displayName}-card-input`}
            error={formData.getIn(['user', 'errors', 'email'])}
            errorKeys='user:errors:email'
            label='Email'
            onEnterKeyPress={this._handleFormSubmission}
            onUpdate={this._handleInputUpdate}
            patternMatches={email()}
            ref='user-email'
            successKeys='user:values:email'
            type='email'
            value={formData.getIn(['user', 'values', 'email'])} />
          <Input
            className={`${displayName}-card-input`}
            error={formData.getIn(['user', 'errors', 'password'])}
            errorKeys='user:errors:password'
            label='Password'
            onEnterKeyPress={this._handleFormSubmission}
            onUpdate={this._handlePasswordUpdate}
            patternMatches={[
              minLength(8, 'Passwords must be at least 8 characters!'),
              matchValue(formData.getIn(['user', 'values', 'passwordConfirmation']), 'Both your passwords must match!')
            ]}
            ref='user-password'
            successKeys='user:values:password'
            type='password'
            value={formData.getIn(['user', 'values', 'password'])} />
          <Input
            className={`${displayName}-card-input`}
            error={formData.getIn(['user', 'errors', 'passwordConfirmation'])}
            errorKeys='user:errors:passwordConfirmation'
            label='Confirm Password'
            onEnterKeyPress={this._handleFormSubmission}
            onUpdate={this._handlePasswordConfirmationUpdate}
            patternMatches={[
              minLength(8, 'Passwords must be at least 8 characters!'),
              matchValue(formData.getIn(['user', 'values', 'password']), 'Both your passwords must match!')
            ]}
            ref='user-passwordConfirmation'
            successKeys='user:values:passwordConfirmation'
            type='password'
            value={formData.getIn(['user', 'values', 'passwordConfirmation'])} />
          <footer className={`${displayName}-footer`}>
            <Button
              color='yellow'
              onClick={this._handleFormSubmission}
              text="I'm done!" />
          </footer>
        </Card>
      </div>
    );
  }

  // TODO:: FIRST THING, Think of way to make this a universal functionality.
  _handleFormSubmission = () => {
    const companyData = this.state.formData.get('company');
    const userData = this.state.formData.get('user');
    // Goes through each input field by ref, calls the `valid` method on them and on // the first invalid field, `find` will return the error message of that input field.
    const firstUserError = userData.get('errors').find((v, k) => !this.refs[`user-${k}`].valid());
    const firstCompanyError = companyData.get('errors').find((v, k) => !this.refs[`company-${k}`].valid());

    // Dispatches the input error if there is one.
    if (firstUserError) {
      return this.context.dispatch(
        AppActionCreators.createFlashMessage('red', firstUserError || 'Please fill out the form properly')
      );
    }
    if (firstCompanyError) {
      return this.context.dispatch(
        AppActionCreators.createFlashMessage('red', firstCompanyError || 'Please fill out the form properly')
      );
    }

    // Dispatches the create user
    this.context.dispatch(
      AuthActionCreators.createCompanyWithUser({
        company: companyData.get('values').toJS(),
        user: userData.get('values').toJS()
      })
    );
  }

  _handleInputUpdate = (value, error, nestedValueObj, nestedErrorObj) => {
    // We're merging a newly created object with all our nested values and errors into the form data state,
    // so that our state is up to date with the input's returns
    const newFormData = this.state.formData.mergeDeep(mergeDeep(nestedValueObj, nestedErrorObj));

    this.setState({formData: newFormData});
  }

  _handlePasswordUpdate = (value, error, nestedValueObj, nestedErrorObj) => {
    let formData = this.state.formData.mergeDeep(nestedValueObj, nestedErrorObj);

    // If the password has no errors and both the passwords match. We want to clear
    // the confirmation's errors as well
    if (!error && this.state.formData.getIn(['user', 'values', 'passwordConfirmation']) === value) {
      formData = formData.setIn(['user', 'errors', 'passwordConfirmation'], null);
    }

    this.setState({formData});
  }

  _handlePasswordConfirmationUpdate = (value, error, nestedValueObj, nestedErrorObj) => {
    let formData = this.state.formData.mergeDeep(nestedValueObj, nestedErrorObj);

    // If the confirmation field has no errors and both the passwords match. We want to clear
    // the password's errors as well
    if (!error && this.state.formData.getIn(['user', 'values', 'password']) === value) {
      formData = formData.setIn(['user', 'errors', 'password'], null);
    }

    this.setState({formData});
  }

}
