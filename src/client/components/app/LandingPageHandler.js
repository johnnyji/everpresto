import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import ReactTemplate from '.././shared/ReactTemplate';
import AuthHelper from '../.././utils/AuthHelper';

export default class LandingPageHandler extends Component {

  static contextTypes = {
    currentUser: PropTypes.object,
    history: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
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