import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import mergeDeep from '../.././utils/mergeDeep';
import Button from '.././ui/Button';
import Card from '.././ui/Card';
import Input from '.././ui/Input';
import RegexHelper from '../.././utils/RegexHelper';
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
    }
  }

  render () {
    const {formData} = this.state;

    return (
      <div className={`${displayName}`}>
        <header className={`${displayName}-header`}>Welcome to the family!</header>
        <Card className={`${displayName}-card'`} ref='form'>
          <Input
            autoFocus={true}
            className={`${displayName}-card-input`}
            error={formData.getIn(['user', 'errors', 'firstName'])}
            errorKeys='user:errors:firstName'
            label='First name...'
            onEnterKeyPress={this._handleFormSubmission}
            onUpdate={this._handleInputUpdate}
            patternMatches={RegexHelper.minLength(1, 'You\'re first name please!')}
            ref='firstName'
            successKeys='user:values:firstName'/>
          <Input
            className={`${displayName}-card-input`}
            error={formData.getIn(['user', 'errors', 'lastName'])}
            errorKeys='user:errors:lastName'
            label='Last name!'
            onEnterKeyPress={this._handleFormSubmission}
            onUpdate={this._handleInputUpdate}
            patternMatches={RegexHelper.minLength(1, 'You\'re last name please!')}
            ref='lastName'
            successKeys='user:values:lastName'/>
          <Input
            className={`${displayName}-card-input`}
            error={formData.getIn(['user', 'errors', 'email'])}
            errorKeys='user:errors:email'
            label='Email'
            onEnterKeyPress={this._handleFormSubmission}
            onUpdate={this._handleInputUpdate}
            patternMatches={RegexHelper.email()}
            ref='email'
            successKeys='user:values:email'
            type='email'/>
          <Input
            className={`${displayName}-card-input`}
            error={formData.getIn(['user', 'errors', 'password'])}
            errorKeys='user:errors:password'
            label='Password'
            onEnterKeyPress={this._handleFormSubmission}
            onUpdate={this._handlePasswordUpdate}
            patternMatches={[
              RegexHelper.minLength(8, 'Passwords must be at least 8 characters!'),
              RegexHelper.matchValue(formData.getIn(['user', 'values', 'passwordConfirmation']), 'Both your passwords must match!')
            ]}
            ref='password'
            successKeys='user:values:password'
            type='password'/>
          <Input
            className={`${displayName}-card-input`}
            error={formData.getIn(['user', 'errors', 'passwordConfirmation'])}
            errorKeys='user:errors:passwordConfirmation'
            label='Confirm Password'
            onEnterKeyPress={this._handleFormSubmission}
            onUpdate={this._handlePasswordConfirmationUpdate}
            patternMatches={[
              RegexHelper.minLength(8, 'Passwords must be at least 8 characters!'),
              RegexHelper.matchValue(formData.getIn(['user', 'values', 'password']), 'Both your passwords must match!')
            ]}
            ref='passwordConfirmation'
            successKeys='user:values:passwordConfirmation'
            type='password'/>
          <Button
            className={`${displayName}-card-button`}
            color='yellow'
            onClick={this._handleFormSubmission}
            text="I'm done!"/>
        </Card>
      </div>
    );
  }

  // TODO:: FIRST THING, Think of way to make this a universal functionality.
  _handleFormSubmission = () => {
    const userData = this.state.formData.get('user');
    // Goes through each input field by ref, calls the `valid` method on them and on // the first invalid field, `find` will return the error message of that input field.
    const firstFoundError = userData.get('errors').find((v, k) => {
      return !this.refs[k].valid();
    });

    // Dispatches the input error if there is one.
    if (firstFoundError !== undefined) {
      return this.context.dispatch(
        AppActionCreators.createFlashMessage('red', firstFoundError || 'Please fill out the form properly')
      );
    }

    // Dispatches the create user
    return this.context.dispatch(
      AuthActionCreators.createUser({
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

    this.setState({formData})
  }

}