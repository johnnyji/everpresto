import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import Button from '.././ui/Button';
import Card from '.././ui/Card';
import Input from '.././ui/Input';
import RegexHelper from '../.././utils/RegexHelper';
import AppActionsCreator from './../../actions/AppActionsCreator';

export default class RegistrationForm extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

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
      })
    }
  }

  render () {
    const {formData} = this.state;

    return (
      <div className='auth-registration-form'>
        <Card className='auth-registration-form-card'>

          <Input
            className='auth-registration-form-card-input'
            error={formData.getIn(['errors', 'firstName'])}
            errorKeys='errors:firstName'
            label='First name...'
            onUpdate={this._handleInputUpdate}
            patternMatches={RegexHelper.minLength(1, 'What\'s your first name?')}
            successKeys='user:firstName'/>

          <Input
            className='auth-registration-form-card-input'
            error={formData.getIn(['errors', 'lastName'])}
            errorKeys='errors:lastName'
            label='Last name!'
            onUpdate={this._handleInputUpdate}
            patternMatches={RegexHelper.minLength(1, 'What\'s your last name?')}
            successKeys='user:lastName'/>

          <Input
            className='auth-registration-form-card-input'
            error={formData.getIn(['errors', 'email'])}
            errorKeys='errors:email'
            label='Email'
            successKeys='user:email'
            onUpdate={this._handleInputUpdate}
            patternMatches={RegexHelper.email()}
            type='email'/>

          <Input
            className='auth-registration-form-card-input'
            error={formData.getIn(['errors', 'password'])}
            errorKeys={[
              'errors:password',
              'errors:passwordConfirmation'
            ]}
            label='Password'
            onUpdate={this._handleInputUpdate}
            patternMatches={[
              RegexHelper.minLength(8, 'Passwords must be at least 8 characters!'),
              RegexHelper.matchValue(formData.getIn(['user', 'passwordConfirmation']), 'Both your passwords must match!')
            ]}
            successKeys='user:password'
            type='password'/>

          <Input
            className='auth-registration-form-card-input'
            error={formData.getIn(['errors', 'passwordConfirmation'])}
            errorKeys={[
              'errors:password',
              'errors:passwordConfirmation'
            ]}
            label='Confirm Password'
            onUpdate={this._handleInputUpdate}
            patternMatches={RegexHelper.matchValue(formData.getIn(['user', 'password']), 'Both your passwords must match!')}
            successKeys='user:passwordConfirmation'
            type='password'/>

          <Button
            className='auth-registration-form-card-button'
            color='yellow'
            onClick={this._handleFormSubmission}
            text="I'm done!"/>

        </Card>
      </div>
    );
  }

  _handleFormSubmission = () => {
    const error = this.state.formData.get('errors').find((v, k) => Boolean(v));
    const requiredFieldsEmpty = this.state.formData.get('user').every((v, k) => !Boolean(v));

    // Dispatches a required fields message.
    if (requiredFieldsEmpty) {
      return this.props.dispatch(AppActionsCreator.createFlashMessage('red', 'Looks like you missed some fields!'));
    }
    // Dispatches the input error if there is one.
    if (error) {
      return this.props.dispatch(AppActionsCreator.createFlashMessage('red', error));
    }
    
    // TODO:: Submit form
  }

  _handleInputUpdate = (value, error, nestedValueObj, nestedErrorObj) => {
    // We're merging a newly created object with all our nested values and errors into the form data state,
    // so that our state is up to date with the input's returns
    const newFormData = this.state.formData.mergeDeep(Object.assign({}, nestedValueObj, nestedErrorObj));

    this.setState({formData: newFormData});
  }
}