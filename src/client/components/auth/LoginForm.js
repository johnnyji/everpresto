import Immutable from 'immutable';
import React, {Component, PropTypes} from 'react';
import mergeDeep from '../.././utils/mergeDeep';
import {email, minLength} from '../.././utils/RegexHelper';
import {isTruthy} from '../.././utils/immutable/IterableFunctions';

import Button from 'ui-components/src/Button';
import Card from '.././ui/Card';
import Input, {validators} from 'ui-components/src/Input';
import AppActionCreators from '../.././actions/AppActionCreators';
import AuthActionCreators from '../.././actions/AuthActionCreators';

const displayName = 'LoginForm';

export default class LoginForm extends Component {

  static displayName = displayName;

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  state = {
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

  render () {
    const {showPassword, user} = this.state;

    return (
      <div className={displayName}>
        <Card>
          <h1 className={`${displayName}-title`}>Welcome Home!</h1>
          <Input
            autoFocus={true}
            className={`${displayName}-input`}
            error={user.getIn(['email', 'error'])}
            label='youremail@domain.com'
            name='email'
            onEnterKeyPress={this._handleLogin}
            onUpdate={this._handleInputUpdate}
            patternMatches={validators.email('Hmmm, are you sure that\'s your email?')}
            value={user.getIn(['email', 'value'])} />
          <Input
            className={`${displayName}-input`}
            error={user.getIn(['password', 'error'])}
            label='*************'
            name='password'
            onEnterKeyPress={this._handleLogin}
            onUpdate={this._handleInputUpdate}
            patternMatches={validators.minLength(1, 'Don\'t forget to enter a password!')}
            type={showPassword ? 'text' : 'password'}
            value={user.getIn(['password', 'value'])} />
          <label className={`${displayName}-show-password`}>
            <input
              checked={showPassword}
              onChange={this._toggleShowPassword}
              type='checkbox' />
            Show password?
          </label>
          <footer className={`${displayName}-footer`}>
            <Button onClick={this._handleLogin}>Login</Button>
          </footer>
        </Card>
      </div>
    );
  }

  _handleInputUpdate = (value, error, name) => {
    this.setState({
      user: this.state.user.merge({[name]: {error, value}})
    });
  };

  _handleLogin = () => {
    const {dispatch} = this.context;
    const {user} = this.state;
    const error = user.getIn(['email', 'error']) || user.getIn(['password', 'error']);

    if (error)
      dispatch(AppActionCreators.createFlashMessage('red', error));
      return;
    }

    dispatch(AuthActionCreators.login({
      email: user.getIn(['email', 'value']),
      password: user.getIn(['password', 'value'])
    }));
  };

  _toggleShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword});
  };
  
}
