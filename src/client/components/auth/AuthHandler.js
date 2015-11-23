import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';


@connect((state) => ({
  auth: state.auth
}))
export default class AuthHandler extends Component {

  static displayName = 'AuthHandler';

  // Gets the location from the route component
  static contextTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  static propTypes = {
    auth: ImmutablePropTypes.map.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentWillMount() {
    // Redirects the user to the dashboard if they're already authenticated.
    if (Boolean(this.props.auth.get('user'))) {
      this.context.history.replaceState(null, '/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    // If the user props are different, we redirect accordingly
    if (!this.props.auth.equals(nextProps.auth)) {
      if (Boolean(nextProps.auth.get('user'))) {
        this.context.history.replaceState(null, '/dashboard');
      } else {
        this.context.histroy.replaceState(null, )
      }
    }
  } 

  render() {
    const path = this.context.location.pathname;
    // Returns the registration form if the route path is '/join', otherwise
    // returns the login form by default.
    if (path === '/join') return <RegistrationForm />;

    return <LoginForm />;

  }
}