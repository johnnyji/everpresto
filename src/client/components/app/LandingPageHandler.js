import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import ReactTemplate from '.././shared/ReactTemplate';
import AuthHelper from '../.././utils/AuthHelper';

export default class LandingPageHandler extends Component {

  // TODO: Change to history context and find way to manually execute route transitions in v1
  static contextTypes = {
    currentUser: PropTypes.object,
    history: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
  }

  componentWillMount () {
    // if (Boolean(this.context.currentUser)) {
    //   debugger
    //   this.context.history.pushState(null, '/dashboard');
    // }
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