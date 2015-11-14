import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import Button from '.././ui/Button';
import Input from '.././ui/Input';
import RegexHelper from '../.././utils/RegexHelper';
import AuthActions from '../.././actions/AuthActions';

export default class RegistrationForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      formData: Immutable.fromJS({
        user: {
          firstName: null,
          lastName: null,
          email: null,
          password: null,
          passwordConfirmation: null
        },
        errors: {
          firstName: null,
          lastName: null,
          email: null,
          password: null,
          passwordConfirmation: null
        }
      })
    }
  }

  _registerUser(e) {
    e.preventDefault();
    AuthActions.createUser({user: this.props.user});
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(JSON.stringify(nextState.formData.get('errors').toJS(), null, 2));
  }

  render () {

    return (
      <div className='auth-registration-form'>
        <Input
          className='auth-registration-form-input'
          error={this.state.formData.getIn(['errors', 'firstName'])}
          errorKeys='errors:firstName'
          label='First name...'
          successKeys='user:firstName'
          onUpdate={this._handleInputUpdate}/>
        <Input
          className='auth-registration-form-input'
          error={this.state.formData.getIn(['errors', 'lastName'])}
          errorKeys='errors:lastName'
          label='Last name!'
          successKeys='user:lastName'
          onUpdate={this._handleInputUpdate}/>
        <Input
          className='auth-registration-form-input'
          error={this.state.formData.getIn(['errors', 'email'])}
          errorKeys='errors:email'
          label='Email'
          successKeys='user:email'
          onUpdate={this._handleInputUpdate}
          patternMatches={RegexHelper.email()}
          type='email'/>
        <Input
          className='auth-registration-form-input'
          error={this.state.formData.getIn(['errors', 'password'])}
          errorKeys='errors:password'
          label='Password'
          successKeys='user:password'
          patternMatches={RegexHelper.minLength(8, 'Password must be longer than 8 characters.')}
          onUpdate={this._handleInputUpdate}
          type='password'/>
        <Input
          className='auth-registration-form-input'
          error={this.state.formData.getIn(['errors', 'passwordConfirmation'])}
          errorKeys='errors:passwordConfirmation'
          label='Confirm Password'
          patternMatches={RegexHelper.matchPassword(this.state.formData.getIn(['user', 'password']))}
          onUpdate={this._handleInputUpdate}
          successKeys='user:passwordConfirmation'
          type='password'/>
        <Button onClick={this._handleFormSubmission} text='Ready!' />
      </div>
    );
  }

  _handleFormSubmission = () => {
    debugger
    if (this.state.formData.get('errors').toArray()) {}
  }

  _handleInputUpdate = (value, error, valueObj, errorObj) => {
    const newData = Object.assign({}, valueObj, errorObj);

    this.setState({formData: this.state.formData.mergeDeep(newData)});
  }
}