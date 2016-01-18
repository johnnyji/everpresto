import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import {email, minLength} from '../.././utils/RegexHelper';
import {isTruthy} from '../.././utils/immutable/IterableFunctions';
import mergeDeep from '../.././utils/mergeDeep';

import Button from '.././ui/Button';
import Card from '.././ui/Card';
import Input from '.././ui/Input';
import AppActionCreators from '../.././actions/AppActionCreators';
import AuthActionCreators from '../.././actions/AuthActionCreators';

const displayName = 'LoginForm';

export default class LoginForm extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      user: Immutable.fromJS({
        values: {
          email: '',
          password: ''
        },
        errors: {
          email: null,
          password: null
        }
      })
    };
  }

  render () {
    const {showPassword, user} = this.state;

    return (
      <div className={displayName}>
        <Card>
          <Input
            autoFocus={true}
            className={`${displayName}-input`}
            error={user.getIn(['errors', 'username'])}
            errorKeys='errors:username'
            label='youremail@domain.com'
            onEnterKeyPress={this._handleLogin}
            onUpdate={this._handleLogin}
            patternMatches={email('Hmmm, are you sure that\'s your email?')}
            ref='email'
            successKeys='values:username'/>
          <Input
            className={`${displayName}-input`}
            error={user.getIn(['errors', 'password'])}
            errorKeys='user:errors:password'
            label='*************'
            onEnterKeyPress={this._handleLogin}
            onUpdate={this._handleInputUpdate}
            patternMatches={minLength(1, 'Don\'t forget to enter a password!')}
            ref='password'
            successKeys='user:values:password'
            type={showPassword ? 'text' : 'password'}/>
          <label>
            <input
              checked={showPassword}
              onChange={this._toggleShowPassword}
              type='checkbox'/>
            Show password?
          </label>
          <Button
            className={`${displayName}-submit-button`}
            color='green'
            onClick={this._handleLogin}
            text='Login' />
        </Card>
      </div>
    );
  }

  _handleInputUpdate = (value, err, valueObj, errObj) => {
    this.setState({
      user: this.state.user.mergeDeep(mergeDeep(valueObj, errObj))
    });
  };

  _handleLogin = () => {
    const {dispatch} = this.context;
    const {user} = this.state;

    if (user.get('errors').find(isTruthy) !== undefined) {
      return dispatch(AppActionCreators.createFlashMessage('red', 'Please fill the login form properly.'));
    }

    dispatch(AuthActionCreators.login(user.get('values').toJS()));
  };

  _toggleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  };
  
}