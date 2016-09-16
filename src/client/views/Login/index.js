import React, {PureComponent, PropTypes} from 'react';
import AppActionCreators from '../../actions/AppActionCreators';
import AuthActionCreators from '../../actions/AuthActionCreators';
import Button from 'ui-components/src/Button';
import Card from '../../components/ui/Card';
import {connect} from 'react-redux';
import CustomPropTypes from '../../utils/CustomPropTypes';
import {fromJS} from 'immutable';
import Input, {validators} from 'ui-components/src/Input';
import styles from './styles/index.scss';

const VALIDATE_EMAIL = validators.email('Hmmm, are you sure that\'s your email?');
const VALIDATE_PASSWORD = validators.minLength(1, 'Don\'t forget to enter a password!');

@connect((state) => ({
  currentUser: state.auth.get('user')
}))
export default class Login extends PureComponent {

  static displayName = 'Login';

  static propTypes = {
    currentUser: CustomPropTypes.user
  };

  static contextTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.shape({
      replace: PropTypes.func.isRequired
    }).isRequired
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

  componentWillMount() {
    if (this.props.currentUser) {
      this.context.router.replace('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    const {currentUser} = this.props;
    const {currentUser: nextUser} = nextProps;

    // If there's currently no user, but there will be one coming up, redirect to dashboard
    if (!currentUser && nextUser) return this.context.router.replace('/dashboard');
    // If there's a current user and no next user, redirect to main page.
    if (currentUser && !nextUser) this.context.router.replace('/');
  }

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
            <Button
              className={styles.loginButton}
              isPill={true}
              onClick={this._handleLogin}>
              Login
            </Button>
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
