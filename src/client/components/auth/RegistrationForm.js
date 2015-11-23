import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import {findDOMNode} from 'react-dom';
import mergeDeep from '../.././utils/mergeDeep';
import Button from '.././ui/Button';
import Card from '.././ui/Card';
import Input from '.././ui/Input';
import RegexHelper from '../.././utils/RegexHelper';
import AppActionsCreator from './../../actions/AppActionsCreator';
import AuthActionsCreator from './../../actions/AuthActionsCreator';

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
          firstName: {
            error: null,
            value: ''
          },
          lastName: {
            error: null,
            value: ''
          },
          email: {
            error: null,
            value: ''
          },
          password: {
            error: null,
            value: ''
          },
          passwordConfirmation: {
            error: null,
            value: ''
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
            error={formData.getIn(['user', 'firstName', 'error'])}
            errorKeys='user:firstName:error'
            label='First name...'
            onUpdate={this._handleInputUpdate}
            patternMatches={RegexHelper.minLength(1, 'You\'re first name please!')}
            ref='firstName'
            successKeys='user:firstName:value'/>

          <Input
            className={`${displayName}-card-input`}
            error={formData.getIn(['user', 'lastName', 'error'])}
            errorKeys='user:lastName:error'
            label='Last name!'
            onUpdate={this._handleInputUpdate}
            patternMatches={RegexHelper.minLength(1, 'You\'re last name please!')}
            ref='lastName'
            successKeys='user:lastName:value'/>

          <Input
            className={`${displayName}-card-input`}
            error={formData.getIn(['user', 'email', 'error'])}
            errorKeys='user:email:error'
            label='Email'
            onUpdate={this._handleInputUpdate}
            patternMatches={RegexHelper.email()}
            ref='email'
            successKeys='user:email:value'
            type='email'/>

          <Input
            className={`${displayName}-card-input`}
            error={formData.getIn(['user', 'password', 'error'])}
            errorKeys='user:password:error'
            label='Password'
            onUpdate={this._handleInputUpdate}
            patternMatches={[
              RegexHelper.minLength(8, 'Passwords must be at least 8 characters!'),
              RegexHelper.matchValue(formData.getIn(['user', 'passwordConfirmation', 'value']), 'Both your passwords must match!')
            ]}
            ref='password'
            successKeys='user:password:value'
            type='password'/>

          <Input
            className={`${displayName}-card-input`}
            error={formData.getIn(['user', 'passwordConfirmation', 'error'])}
            errorKeys='user:passwordConfirmation:error'
            label='Confirm Password'
            ref='nigga'
            onUpdate={this._handleInputUpdate}
            patternMatches={[
              RegexHelper.minLength(8, 'Passwords must be at least 8 characters!'),
              RegexHelper.matchValue(formData.getIn(['user', 'password', 'value']), 'Both your passwords must match!')
            ]}
            ref='passwordConfirmation'
            successKeys='user:passwordConfirmation:value'
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
    // The first input field we find that isn't value, we stop the loop and return that object
    const firstInvalidField = userData.find((v, k) => !this.refs[k].valid());
    
    // Dispatches the input error if there is one.
    if (firstInvalidField !== undefined) {
      return this.context.dispatch(
        AppActionsCreator.createFlashMessage('red', firstInvalidField.get('error') || 'Please fill out the form properly')
      );
    }

    return this.context.dispatch(
      AuthActionsCreator.createUser({
        firstName: userData.getIn(['firstName', 'value']),
        lastName: userData.getIn(['lastName', 'value']),
        email: userData.getIn(['email', 'value']),
        password: userData.getIn(['password', 'value']),
        passwordConfirmation: userData.getIn(['passwordConfirmation', 'value'])
      })
    );
  }

  _handleInputUpdate = (value, error, nestedValueObj, nestedErrorObj) => {
    // We're merging a newly created object with all our nested values and errors into the form data state,
    // so that our state is up to date with the input's returns
    const newFormData = this.state.formData.mergeDeep(mergeDeep(nestedValueObj, nestedErrorObj));

    this.setState({formData: newFormData});
  }
}