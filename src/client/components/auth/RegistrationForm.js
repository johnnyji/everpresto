import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import Button from '.././ui/Button';
import Card from '.././ui/Card';
import Input from '.././ui/Input';
import RegexHelper from '../.././utils/RegexHelper';
import AuthActions from '../.././actions/AuthActions';

export default class RegistrationForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      formData: Immutable.fromJS({
        user: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirmation: ''
        },
        errors: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirmation: ''
        }
      }),
      readyToSubmit: false
    }
  }

  _registerUser(e) {
    e.preventDefault();
    AuthActions.createUser({user: this.props.user});
  }

  render () {

    return (
      <div className='auth-registration-form'>
        <Card className='auth-registration-form-card'>
          <Input
            className='auth-registration-form-card-input'
            error={this.state.formData.getIn(['errors', 'firstName'])}
            errorKeys='errors:firstName'
            label='First name...'
            patternMatches={RegexHelper.minLength(1, 'What\'s your first name?')}
            successKeys='user:firstName'
            onUpdate={this._handleInputUpdate}/>
          <Input
            className='auth-registration-form-card-input'
            error={this.state.formData.getIn(['errors', 'lastName'])}
            errorKeys='errors:lastName'
            label='Last name!'
            patternMatches={RegexHelper.minLength(1, 'What\'s your last name?')}
            successKeys='user:lastName'
            onUpdate={this._handleInputUpdate}/>
          <Input
            className='auth-registration-form-card-input'
            error={this.state.formData.getIn(['errors', 'email'])}
            errorKeys='errors:email'
            label='Email'
            successKeys='user:email'
            onUpdate={this._handleInputUpdate}
            patternMatches={RegexHelper.email()}
            type='email'/>
          <Input
            className='auth-registration-form-card-input'
            error={this.state.formData.getIn(['errors', 'password'])}
            errorKeys='errors:password'
            label='Password'
            successKeys='user:password'
            patternMatches={RegexHelper.minLength(8, 'Password must be longer than 8 characters.')}
            onUpdate={this._handleInputUpdate}
            type='password'/>
          <Input
            className='auth-registration-form-card-input'
            error={this.state.formData.getIn(['errors', 'passwordConfirmation'])}
            errorKeys='errors:passwordConfirmation'
            label='Confirm Password'
            patternMatches={RegexHelper.matchPassword(this.state.formData.getIn(['user', 'password']))}
            onUpdate={this._handleInputUpdate}
            successKeys='user:passwordConfirmation'
            type='password'/>
          <Button
            className='auth-registration-form-card-button'
            color='yellow'
            disabled={!this.state.readyToSubmit}
            onClick={this._handleFormSubmission}
            text={this.state.readyToSubmit ? 'Ready!' : 'Almost done...'}/>
        </Card>
      </div>
    );
  }

  _checkReadyToSubmit = (errors) => {
    // TODO: Move into form helper so every form can check to see if there are errors;
    // Makes sure every error in the form is null
    return errors.every((v, k) => v === null);
  }

  _handleFormSubmission = () => {
    if (!this.state.readyToSubmit) return;

    // TODO: Submit form
  }

  _handleInputUpdate = (value, error, valueObj, errorObj) => {
    const newFormData = this.state.formData.mergeDeep(Object.assign({}, valueObj, errorObj));
    const readyToSubmit = this._checkReadyToSubmit(newFormData.get('errors'));

    this.setState({formData: newFormData, readyToSubmit});
  }
}