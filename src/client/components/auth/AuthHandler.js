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

  // Gets the location from the route component
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    currentUser: CustomPropTypes.user
  };

  componentWillMount() {
    const {currentUser, location} = this.props;
    // Redirects the user to the dashboard if they're already authenticated.
    if (Boolean(currentUser)) location.replace('/dashboard');
  }

  componentWillUpdate(nextProps) {
    // If the user props are different, we redirect accordingly
    if (!this.props.currentUser.equals(nextProps.currentUser)) {
      if (nextProps.currentUser) return this.context.router.replace('/dashboard');
      this.context.router.replace('/');
    }
  }

  render() {
    // Returns the registration form if the route path is '/join', otherwise
    // returns the login form by default.
    if (this.props.location.pathname === '/join') return <RegistrationForm />;
    return <LoginForm />;
  }
}