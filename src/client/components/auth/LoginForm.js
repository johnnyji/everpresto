import Immutable from 'immutable';
import React, {Component, PropTypes} from 'react';
import mergeDeep from '../.././utils/mergeDeep';
import {email, minLength} from '../.././utils/RegexHelper';
import {isTruthy} from '../.././utils/immutable/IterableFunctions';

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
          <h1 className={`${displayName}-title`}>Welcome Home!</h1>
          <Input
            autoFocus={true}
            className={`${displayName}-input`}
            error={user.getIn(['errors', 'email'])}
            errorKeys='errors:email'
            label='youremail@domain.com'
            onEnterKeyPress={this._handleLogin}
            onUpdate={this._handleInputUpdate}
            patternMatches={email('Hmmm, are you sure that\'s your email?')}
            ref='email'
            successKeys='values:email'
            value={user.getIn(['values', 'email'])} />
          <Input
            className={`${displayName}-input`}
            error={user.getIn(['errors', 'password'])}
            errorKeys='errors:password'
            label='*************'
            onEnterKeyPress={this._handleLogin}
            onUpdate={this._handleInputUpdate}
            patternMatches={minLength(1, 'Don\'t forget to enter a password!')}
            ref='password'
            successKeys='values:password'
            type={showPassword ? 'text' : 'password'}
            value={user.getIn(['values', 'password'])} />
          <label className={`${displayName}-show-password`}>
            <input
              checked={showPassword}
              onChange={this._toggleShowPassword}
              type='checkbox' />
            Show password?
          </label>
          <footer className={`${displayName}-footer`}>
            <Button
              color='green'
              onClick={this._handleLogin}
              text='Login' />
          </footer>
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
    this.setState({showPassword: !this.state.showPassword});
  };
  
}
