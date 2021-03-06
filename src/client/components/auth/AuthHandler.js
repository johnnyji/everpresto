import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '.././CustomPropTypes';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

@connect((state) => ({
  currentUser: state.auth.get('user')
}))
export default class AuthHandler extends Component {

  static displayName = 'AuthHandler';

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    location: PropTypes.object.isRequired,
    currentUser: CustomPropTypes.user
  };

  componentWillMount() {
    // Redirects the user to the dashboard if they're already authenticated.
    if (this.props.currentUser) this.context.router.replace('/dashboard');
  }

  componentWillUpdate(nextProps) {
    const {currentUser} = this.props;
    const {currentUser: nextUser} = nextProps;

    // If there's currently no user, but there will be one coming up, redirect to dashboard
    if (!currentUser && nextUser) return this.context.router.replace('/dashboard');
    // If there's a current user and no next user, redirect to main page.
    if (currentUser && !nextUser) return this.context.router.replace('/');
  }

  render() {
    // Returns the registration form if the route path is '/join', otherwise
    // returns the login form by default.
    if (this.props.location.pathname === '/join') return <RegistrationForm />;
    return <LoginForm />;
  }
}
