import React, {PureComponent, PropTypes} from 'react';
import AppActionCreators from '../../actions/AppActionCreators';
import AuthActionCreators from '../../actions/AuthActionCreators';
import Button from 'ui-components/src/Button';
import Card from '../../components/ui/Card';
import cssModulesPath from '../../utils/cssModulesPath';
import {fromJS} from 'immutable';
import Input, {validators} from 'ui-components/src/Input';

const styles = require('!style!css?modules!postcss!sass!./styles/index.scss');

const VALIDATE_EMAIL = validators.email('Hmmm, are you sure that\'s your email?');
const VALIDATE_PASSWORD = validators.minLength(1, 'Don\'t forget to enter a password!');
 
export default class Login extends PureComponent {

  static displayName = 'Login';

  static contextTypes = {
    dispatch: PropTypes.func.isRequired
  };

  state = {
    showPassword: false,
    user: fromJS({
      email: {
        value: '',
        error: null
      },
      password: {
        value: '',
        error: null
      }
    })
  };

  render () {
    const {showPassword, user} = this.state;

    return (
      <div className={styles.main}>
        <Card>
          <h1 className={styles.title}>Welcome Home!</h1>
          <Input
            autoFocus={true}
            className={styles.input}
            error={user.getIn(['email', 'error'])}
            label='youremail@domain.com'
            name='email'
            onEnterKeyPress={this._handleLogin}
            onUpdate={this._handleInputUpdate}
            patternMatches={VALIDATE_EMAIL}
            value={user.getIn(['email', 'value'])} />
          <Input
            className={styles.input}
            error={user.getIn(['password', 'error'])}
            label='*************'
            name='password'
            onEnterKeyPress={this._handleLogin}
            onUpdate={this._handleInputUpdate}
            patternMatches={VALIDATE_PASSWORD}
            type={showPassword ? 'text' : 'password'}
            value={user.getIn(['password', 'value'])} />
          <label className={styles.showPassword}>
            <input
              className={styles.input}
              checked={showPassword}
              onChange={this._toggleShowPassword}
              type='checkbox' />
            Show password?
          </label>
          <footer className={styles.footer}>
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

    if (error) {
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
