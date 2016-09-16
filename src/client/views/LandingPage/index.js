import React, {PropTypes, PureComponent} from 'react';
import Clickable from 'ui-components/src/Clickable';
import CustomPropTypes from '../../utils/CustomPropTypes';
import {Link} from 'react-router';
import Spinner from 'ui-components/src/Spinner';

export default class LandingPageHandler extends PureComponent {

  static contextTypes = {
    router: PropTypes.shape({
      replace: PropTypes.func.isRequired
    }).isRequired
  };

  static propTypes = {
    currentUser: CustomPropTypes.user
  };

  render () {
    return (
      <div>
        <Clickable onClick={this._handleLoginView}>Login</Clickable>
        <h1>Tickit</h1>
        <p>Track and manage time, the better way.</p>
        <Link to='/join'>Try for free!</Link>
      </div>
    );
  }

  _handleLoginView = () => {
    this.context.router.push('/login');
  };

}
