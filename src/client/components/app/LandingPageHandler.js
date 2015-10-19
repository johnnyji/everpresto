import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import ReactTemplate from '.././shared/ReactTemplate';
import AuthHelper from '../.././utils/AuthHelper';

export default class LandingPageHandler extends ReactTemplate {

  static contextTypes = {
    router: PropTypes.func
  }

  constructor (props) {
    super(props);
  }

  componentWillMount () {
    // if (localStorage.getItem('jwt')) AuthHelper.updateCurrentUser();
    if (localStorage.getItem('jwt')) this.context.router.transitionTo('/dashboard');
  }

  render () {
    return (
      <div>
        <h1>Tickit</h1>
        <p>Track and manage time, the better way.</p>
        <Link to='/join'>Try for free!</Link>
      </div>
    );
  }
}